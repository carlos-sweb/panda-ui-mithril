/**
 * Build script for the playground static site.
 * Usage: bun run scripts/build.ts
 *
 * Steps:
 * 1. Run Panda CSS codegen (generates JS utilities)
 * 2. Run Panda CSS cssgen (generates static CSS)
 * 3. Run Bun build (bundles everything)
 */

import { existsSync, rmSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'

const ROOT = resolve(import.meta.dir, '..')
const OUTDIR = resolve(ROOT, 'dist-playground')

// Clean output directory
if (existsSync(OUTDIR)) {
  rmSync(OUTDIR, { recursive: true })
}
mkdirSync(OUTDIR, { recursive: true })

console.log('🐼 Step 1: Running Panda CSS codegen...')
try {
  execSync('bunx panda codegen', { cwd: ROOT, stdio: 'inherit' })
  console.log('✅ Panda CSS codegen completed\n')
} catch (error) {
  console.error('❌ Panda CSS codegen failed')
  process.exit(1)
}

console.log('🎨 Step 2: Generating Panda CSS static styles...')
try {
  execSync('bunx panda cssgen --outfile styled-system/styles.css', { cwd: ROOT, stdio: 'inherit' })
  console.log('✅ Panda CSS styles generated\n')
} catch (error) {
  console.error('❌ Panda CSS cssgen failed')
  process.exit(1)
}

console.log('📦 Step 3: Building playground → dist-playground/')

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
