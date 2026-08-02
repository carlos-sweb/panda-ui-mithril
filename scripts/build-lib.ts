/**
 * Build script for the npm library package.
 * Usage: bun run scripts/build-lib.ts
 *
 * Outputs:
 * - dist/index.js (ES module, mithril external)
 * - dist/index.d.ts, dist/types.d.ts, dist/components/*\/index.d.ts (type declarations, assembled from src/)
 * - dist/styles.css (static Panda CSS output — consumers must import this)
 */

import { existsSync, rmSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'

const ROOT = resolve(import.meta.dir, '..')
const OUTDIR = resolve(ROOT, 'dist')

// Clean output directory
if (existsSync(OUTDIR)) {
  rmSync(OUTDIR, { recursive: true })
}
mkdirSync(OUTDIR, { recursive: true })

console.log('Building library → dist/')

// Step 0: Regenerate styled-system so codegen/CSS reflect current source
console.log('Running Panda CSS codegen...')
execSync('bunx panda codegen', { cwd: ROOT, stdio: 'inherit' })

// Step 1: Bundle JS with Bun
const result = await Bun.build({
  entrypoints: [resolve(ROOT, 'src/index.js')],
  outdir: OUTDIR,
  format: 'esm',
  minify: true,
  splitting: true,
  external: ['mithril'],
  naming: {
    entry: '[name].[ext]',
    chunk: '[name]-[hash].[ext]',
    asset: '[name]-[hash].[ext]',
  },
})

if (!result.success) {
  console.error('Build failed:')
  for (const message of result.logs) {
    console.error(message)
  }
  process.exit(1)
}

console.log('JS bundle built successfully')

// Step 2: Type-check against the current source before publishing
// (component prop types are hand-authored .d.ts files, not compiler output —
// tsc here only validates them, it doesn't emit anything for dist/)
console.log('Type-checking...')
const tsc = Bun.spawnSync(['bunx', 'tsc', '--noEmit', '--project', 'tsconfig.lib.json'], {
  cwd: ROOT,
  stdio: ['inherit', 'inherit', 'inherit'],
})

if (tsc.exitCode !== 0) {
  console.error('Type-check failed')
  process.exit(1)
}

console.log('Type-check passed')

// Step 2b: Assemble dist/*.d.ts
// src/index.d.ts and src/types.d.ts are hand-authored and copied as-is.
// Each component gets a dist/components/<Name>/index.d.ts:
//   - hand-authored ones (currently Button, Alert) are copied as-is
//   - the rest are stubbed with `export const X: any` for every named export,
//     extracted from the component's `export const X = ...` lines, so the
//     barrel re-exports in index.d.ts resolve for consumers. Proper prop
//     types for these remain a TODO (tracked in README's Estado section).
console.log('Assembling type declarations...')

Bun.write(resolve(OUTDIR, 'index.d.ts'), readFileSync(resolve(ROOT, 'src/index.d.ts')))
Bun.write(resolve(OUTDIR, 'types.d.ts'), readFileSync(resolve(ROOT, 'src/types.d.ts')))
mkdirSync(resolve(OUTDIR, 'utils'), { recursive: true })
Bun.write(resolve(OUTDIR, 'utils/cx.d.ts'), readFileSync(resolve(ROOT, 'src/utils/cx.d.ts')))

const componentsDir = resolve(ROOT, 'src/components')
for (const name of readdirSync(componentsDir)) {
  const srcDts = resolve(componentsDir, name, 'index.d.ts')
  const outDir = resolve(OUTDIR, 'components', name)
  mkdirSync(outDir, { recursive: true })

  if (existsSync(srcDts)) {
    Bun.write(resolve(outDir, 'index.d.ts'), readFileSync(srcDts))
    continue
  }

  const srcJs = resolve(componentsDir, name, 'index.js')
  const source = readFileSync(srcJs, 'utf-8')
  const names = [...source.matchAll(/^export const (\w+)/gm)].map((m) => m[1])
  const stub = names.map((n) => `export const ${n}: any\n`).join('')
  writeFileSync(resolve(outDir, 'index.d.ts'), stub)
}

console.log('Type declarations assembled')

// Step 3: Generate static CSS output
// Component recipes (cva/sva from styled-system/css) resolve to static class
// names at build time — the actual rules only exist in this generated stylesheet.
// Consumers must import it explicitly; it is not bundled into index.js.
console.log('Generating static CSS...')
execSync(`bunx panda cssgen --outfile ${resolve(OUTDIR, 'styles.css')}`, {
  cwd: ROOT,
  stdio: 'inherit',
})
console.log('CSS generated')

console.log(`\nBuild succeeded. Output in ${OUTDIR}`)

// List output files
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
