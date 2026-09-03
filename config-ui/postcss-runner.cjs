#!/usr/bin/env bun
/**
 * postcss-runner.cjs — ejecuta el pipeline postcss de un proyecto desde su
 * propio postcss.config.cjs (vía recomendada por Panda).
 *
 * Uso: bun config-ui/postcss-runner.cjs <projectRoot> <entry> <output>
 *   - projectRoot: raíz del proyecto (donde está postcss.config.cjs).
 *   - entry: css de entrada con la directiva @layer (relativo a projectRoot).
 *   - output: css de salida (relativo a projectRoot).
 *
 * Resuelve `postcss` y cada plugin desde el node_modules del PROYECTO
 * (createRequire(projectRoot)), no desde config-ui. El plugin de Panda
 * (@pandacss/dev/postcss) lee panda.config.ts del cwd del proyecto y emite
 * preflight/tokens/recipes/utilities + globalFontface en las capas @layer.
 *
 * Soporta el formato estándar de postcss-load-config:
 *   plugins: { 'name': opts }  |  plugins: [[name, opts], ...]  |  funciones
 */
'use strict'

const { createRequire } = require('node:module')
const path = require('node:path')
const fs = require('node:fs')

const [, , projectRoot, entry, output] = process.argv

if (!projectRoot || !entry || !output) {
  console.error('Uso: postcss-runner.cjs <projectRoot> <entry> <output>')
  process.exit(1)
}

const req = createRequire(path.join(projectRoot, 'noop.js'))
const configPath = path.join(projectRoot, 'postcss.config.cjs')

if (!fs.existsSync(configPath)) {
  console.error(`postcss-runner: no existe ${configPath}`)
  process.exit(1)
}

let postcss
try {
  postcss = req('postcss')
} catch (e) {
  console.error(`postcss-runner: no se pudo resolver 'postcss' desde ${projectRoot} — instálalo (bun add -d postcss)`)
  process.exit(1)
}

const config = req(configPath)

const PANDA_PLUGIN = '@pandacss/dev/postcss'

/** Resuelve configPath/cwd del plugin de Panda a rutas absolutas. */
function pandaOptions(opts) {
  const o = { ...(opts || {}) }
  const cwd = o.cwd
    ? path.resolve(projectRoot, o.cwd)
    : projectRoot
  o.cwd = cwd
  o.configPath = o.configPath
    ? path.resolve(cwd, o.configPath)
    // Default explícito: panda.config.ts de la raíz (igual que build-css.ts
    // con resolve(ROOT, 'panda.config.ts')). Sin él, Panda auto-detecta con
    // findConfig({ cwd }) — funciona, pero explícito es determinista y
    // permite apuntar a otro archivo (config file panda manual).
    : path.join(cwd, 'panda.config.ts')
  return o
}

/** Instancia plugins desde el formato de postcss-load-config. */
function resolvePlugins(raw) {
  const out = []
  const pushPlugin = (name, opts) => {
    const pluginOpts = name === PANDA_PLUGIN ? pandaOptions(opts) : (opts === undefined ? {} : opts)
    out.push(req(name)(pluginOpts))
  }
  if (Array.isArray(raw)) {
    for (const item of raw) {
      if (typeof item === 'function') out.push(item)
      else if (typeof item === 'string') out.push(req(item)())
      else if (Array.isArray(item)) pushPlugin(item[0], item[1])
      else if (item && typeof item === 'object') {
        for (const [name, opts] of Object.entries(item)) pushPlugin(name, opts)
      }
    }
    return out
  }
  if (raw && typeof raw === 'object') {
    for (const [name, opts] of Object.entries(raw)) pushPlugin(name, opts)
    return out
  }
  return out
}

const plugins = resolvePlugins(config.plugins)
if (plugins.length === 0) {
  console.error('postcss-runner: postcss.config.cjs no declara plugins.')
  process.exit(1)
}

const from = path.resolve(projectRoot, entry)
const to = path.resolve(projectRoot, output)

if (!fs.existsSync(from)) {
  console.error(`postcss-runner: el entry no existe: ${from}`)
  process.exit(1)
}

const css = fs.readFileSync(from, 'utf8')

postcss(plugins)
  .process(css, { from, to })
  .then((result) => {
    fs.mkdirSync(path.dirname(to), { recursive: true })
    fs.writeFileSync(to, result.css)
    console.log(`postcss → ${output} (${(result.css.length / 1024).toFixed(1)} KB)`)
  })
  .catch((e) => {
    console.error(`postcss-runner: ${e && e.stack ? e.stack : e}`)
    process.exit(1)
  })
