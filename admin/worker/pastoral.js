import { HttpError, requireAdmin } from './auth.js'

export function validDate(value) {
  if (value == null || value === '') return null
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new HttpError(400,'Use una fecha AAAA-MM-DD.')
  const date = new Date(value + 'T00:00:00Z')
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0,10) !== value || value < '1900-01-01' || value > new Date().toISOString().slice(0,10)) throw new HttpError(400,'Fecha inválida o futura.')
  return value
}
export async function pastoralAdmin(request,env,url,identity,readBody) {
  requireAdmin(identity)
  if (request.method === 'GET' && url.pathname === '/api/pastoral') {
    const {results} = await env.DB.prepare('SELECT p.*,json_extract(d.draft,\'$.nombre\') AS nombre FROM pastoral_profiles p JOIN directory_records d ON d.id=p.person_id ORDER BY nombre').all()
    return Response.json(results)
  }
  if (request.method === 'GET' && url.pathname === '/api/pastoral/birthdays') {
    const month=url.searchParams.get('month')
    if (month !== null && !/^(0[1-9]|1[0-2])$/.test(month)) throw new HttpError(400,'Mes inválido: use 01 a 12.')
    const {results}=await env.DB.prepare('SELECT * FROM pastoral_birthdays WHERE fecha_nacimiento IS NOT NULL AND (? IS NULL OR substr(mes_dia,1,2)=?) ORDER BY mes_dia,nombre').bind(month,month).all()
    return Response.json(results)
  }
  const match=url.pathname.match(/^\/api\/pastoral\/([a-zA-Z0-9-]+)$/)
  if (!match || request.method !== 'PUT') throw new HttpError(404,'Operación no encontrada.')
  const person=await env.DB.prepare("SELECT id FROM directory_records WHERE id=? AND kind='person'").bind(match[1]).first()
  if (!person) throw new HttpError(404,'Persona no encontrada.')
  const input=await readBody(request)
  if (!['pastor','pastora'].includes(input.role)) throw new HttpError(400,'Seleccione pastor o pastora.')
  const birth=validDate(input.fecha_nacimiento)
  const previous=await env.DB.prepare('SELECT updated_at FROM pastoral_profiles WHERE person_id=?').bind(match[1]).first()
  if ((previous?.updated_at ?? null) !== (input.updated_at ?? null)) throw new HttpError(409,'Otra persona actualizó esta ficha. Recargue.')
  const now=new Date().toISOString()
  const result=await env.DB.prepare('INSERT INTO pastoral_profiles(person_id,role,fecha_nacimiento,updated_at) VALUES(?,?,?,?) ON CONFLICT(person_id) DO UPDATE SET role=excluded.role,fecha_nacimiento=excluded.fecha_nacimiento,updated_at=excluded.updated_at WHERE pastoral_profiles.updated_at=?').bind(match[1],input.role,birth,now,input.updated_at ?? null).run()
  if (result.meta.changes !== 1) throw new HttpError(409,'Otra persona actualizó esta ficha. Recargue.')
  return Response.json(await env.DB.prepare('SELECT * FROM pastoral_profiles WHERE person_id=?').bind(match[1]).first())
}
