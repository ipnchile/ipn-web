// Validación de sintaxis JS y componentes Vue con las dependencias existentes.
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { parse, compileScript, compileTemplate } from 'vue/compiler-sfc'

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(join(dir, entry.name)) : join(dir, entry.name)))).flat()
}
let failures = 0
const paths = [...await files('src'), ...await files('scripts'), ...await files('tests'), 'vite.config.js']
for (const path of paths) {
  if (/\.m?js$/.test(path)) {
    const result = spawnSync(process.execPath, ['--check', path], { encoding: 'utf8' })
    if (result.status !== 0) { failures++; console.error(path, result.stderr || result.error) }
  } else if (path.endsWith('.vue')) {
    try {
      const { descriptor, errors } = parse(await readFile(path, 'utf8'), { filename: path })
      if (errors.length) throw errors
      const script = descriptor.script || descriptor.scriptSetup ? compileScript(descriptor, { id: path }) : null
      if (descriptor.template) {
        const template = compileTemplate({ source: descriptor.template.content, filename: path, id: path, compilerOptions: { bindingMetadata: script?.bindings } })
        if (template.errors.length) throw template.errors
      }
    } catch (error) { failures++; console.error(path, error) }
  }
}
if (failures) process.exitCode = 1
else console.log('Sintaxis JavaScript y componentes Vue: correcta.')
