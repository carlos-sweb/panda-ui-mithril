/**
 * Build script for the playground static site.
 * Usage: bun run scripts/build.ts
 *
 * Steps:
 * 1. Run build-css.ts (postcss + Panda plugin + lightningcss → styled-system/styles.css)
 * 2. Run Bun build (bundles everything)
 */

import { existsSync, rmSync, mkdirSync, copyFileSync } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'

const ROOT = resolve(import.meta.dir, '..')
const OUTDIR = resolve(ROOT, 'dist-playground')

// Clean output directory
if (existsSync(OUTDIR)) {
  rmSync(OUTDIR, { recursive: true })
}
mkdirSync(OUTDIR, { recursive: true })

// build-css.ts corre todo el pipeline (plugin postcss de Panda + lightningcss)
// y emite styled-system/styles.css con el target Safari 2024 por defecto.
// Un exit != 0 del hijo propaga el error via execSync.
console.log('🎨 Step 1: Generating CSS via scripts/build-css.ts...')
try {
  execSync('bun run scripts/build-css.ts', { cwd: ROOT, stdio: 'inherit' })
  console.log('✅ CSS generated\n')
} catch (error) {
  console.error('❌ scripts/build-css.ts failed')
  process.exit(1)
}

console.log('📦 Step 2: Building playground → dist-playground/')

const result = await Bun.build({
  entrypoints: [resolve(ROOT, 'playground/index.html')],
  outdir: OUTDIR,
  minify: true,
  splitting: false,
})

if (!result.success) {
  console.error('Build failed:')
  for (const message of result.logs) {
    console.error(message)
  }
  process.exit(1)
}

// Publish llms.txt (https://llmstxt.org/) at the site root alongside the demo
copyFileSync(resolve(ROOT, 'llms.txt'), resolve(OUTDIR, 'llms.txt'))

console.log(`Build succeeded. Output in ${OUTDIR}`)

// List output files
const { readdirSync, statSync } = await import('fs')
function listFiles(dir: string, prefix = '') {
  for (const entry of readdirSync(dir)) {
    const path = `${prefix}${entry}`
    const fullPath = `${dir}/${entry}`
    if (statSync(fullPath).isDirectory()) {
      console.log(`  📁 ${path}/`)
      listFiles(fullPath, `${path}/`)
    } else {
      const size = statSync(fullPath).size
      console.log(`  📄 ${path} (${(size / 1024).toFixed(1)} KB)`)
    }
  }
}
console.log('\nOutput files:')
listFiles(OUTDIR)
