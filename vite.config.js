import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { identityScriptId, identityJson } from './src/utils/structuredData.js'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), {
    name: 'ipn-local-admin', apply: 'serve',
    async configureServer(server) {
      const localModule = new URL('./admin/scripts/local-admin.mjs', import.meta.url).href
      const { createLocalAdmin } = await import(/* @vite-ignore */ localModule)
      const local = await createLocalAdmin()
      server.middlewares.use(local.middleware)
      server.httpServer?.once('close', () => { void local.dispose() })
    },
  }, {
    name: 'ipn-site-identity',
    transformIndexHtml() {
      return [{ tag: 'script', attrs: { id: identityScriptId, type: 'application/ld+json' }, children: identityJson, injectTo: 'head' }]
    },
  }],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }

})