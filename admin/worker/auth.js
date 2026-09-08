import { createRemoteJWKSet, jwtVerify } from 'jose'
let cachedIssuer, cachedKeys
export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status }
}
export function roleFor(email, env) {
  const list = value => (value || '').split(',').map(x => x.trim().toLowerCase()).filter(Boolean)
  if (list(env.ADMIN_EMAILS).includes(email)) return 'admin'
  if (list(env.EDITOR_EMAILS).includes(email)) return 'editor'
  throw new HttpError(403, 'Este correo no tiene permisos para el panel.')
}
export async function verifyIdentity(token, env, keys) {
  if (!env.ACCESS_ISSUER || !env.ACCESS_AUD) throw new HttpError(503, 'El acceso seguro todavía no está configurado.')
  if (!token) throw new HttpError(401, 'Inicie sesión para continuar.')
  let payload
  try {
    const result = await jwtVerify(token, keys, {
      issuer: env.ACCESS_ISSUER, audience: env.ACCESS_AUD,
      algorithms: ['RS256'], requiredClaims: ['exp', 'iat', 'sub', 'email'], maxTokenAge: '8h'
    })
    payload = result.payload
  } catch { throw new HttpError(401, 'La sesión no es válida o ha caducado.') }
  if (typeof payload.email !== 'string') throw new HttpError(401, 'Sesión sin correo verificado.')
  const email = payload.email.trim().toLowerCase()
  return { email, role: roleFor(email, env) }
}
export async function authenticate(request, env) {
  if (new URL(request.url).origin !== env.ADMIN_ORIGIN) throw new HttpError(403, 'Utilice el dominio del panel.')
  if (!/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/.test(env.ACCESS_ISSUER || '')) throw new HttpError(503, 'El acceso seguro todavía no está configurado.')
  if (cachedIssuer !== env.ACCESS_ISSUER) {
    cachedIssuer = env.ACCESS_ISSUER
    cachedKeys = createRemoteJWKSet(new URL(`${env.ACCESS_ISSUER}/cdn-cgi/access/certs`))
  }
  return verifyIdentity(request.headers.get('Cf-Access-Jwt-Assertion'), env, cachedKeys)
}
export function checkMutation(request, env) {
  if (request.headers.get('Origin') !== env.ADMIN_ORIGIN || request.headers.get('X-IPN-Request') !== 'admin') {
    throw new HttpError(403, 'Origen de la solicitud no permitido.')
  }
}
export function requireAdmin(identity) {
  if (identity.role !== 'admin') throw new HttpError(403, 'Solo el administrador puede publicar o retirar contenido.')
}
