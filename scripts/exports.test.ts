import { describe, expect, test } from 'bun:test'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * The published type surface (`src/index.d.ts`, which is what the `types` field
 * of package.json ships) must describe the same API the runtime exposes. It had
 * drifted: `Title` and 14 `Chat*` components were exported by `src/index.js`
 * but missing from the declarations, `RatingGroup` was re-exported by the
 * barrel while its own `.d.ts` declared only the attrs interface, and `cx` was
 * re-exported from a `./utils/cx` module that does not exist.
 *
 * None of that was visible: `npm run typecheck` runs with `skipLibCheck: true`
 * and the barrel's `.js` is never compared against the barrel's `.d.ts`. These
 * tests are that comparison, as text — no compiler and no JSX involved, so they
 * also cover the parts of the package a consumer sees first.
 *
 * Sibling check: `scripts/check-dts.ts` compiles `src/**` with `skipLibCheck`
 * off for the errors that are not about exports (an interface extending another
 * one incorrectly, for instance).
 */
const SRC = join(import.meta.dir, '..', 'src')
const COMPONENTS = join(SRC, 'components')

/** Names exported as VALUES (`export { A, B as C }`, `export const X`, …). */
function valueExports(source: string): Set<string> {
  const names = new Set<string>()
  for (const match of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const entry of match[1].split(',')) {
      const part = entry.trim()
      if (!part || part.startsWith('type ')) continue
      const name = part.split(/\s+as\s+/).pop()!.trim()
      if (/^[A-Za-z_$][\w$]*$/.test(name)) names.add(name)
    }
  }
  for (const match of source.matchAll(
    /export\s+(?:declare\s+)?(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g,
  )) {
    names.add(match[1])
  }
  return names
}

/** Names declared as TYPES (`export interface X`, `export type Y`). */
function declaredTypes(source: string): Set<string> {
  const names = new Set<string>()
  for (const match of source.matchAll(
    /export\s+(?:declare\s+)?(?:interface|type)\s+([A-Za-z_$][\w$]*)/g,
  )) {
    names.add(match[1])
  }
  return names
}

/** Module specifiers a source imports/re-exports, relative ones only. */
function relativeSpecs(source: string): string[] {
  return [...source.matchAll(/from\s*'([^']+)'/g)]
    .map((match) => match[1])
    .filter((spec) => spec.startsWith('.'))
}

/** True when a relative specifier points at a file TypeScript can resolve. */
function resolves(spec: string): boolean {
  return resolveFile(spec) !== null
}

/** The file a relative specifier resolves to, or null. */
function resolveFile(spec: string): string | null {
  const base = join(SRC, spec.replace(/^\.\//, ''))
  for (const ext of ['.d.ts', '.ts', '.js', '/index.d.ts', '/index.ts', '/index.js']) {
    if (existsSync(base + ext)) return base + ext
  }
  return null
}

/**
 * Names the barrel re-exports WITHOUT the `type` keyword but which the target
 * module declares as interfaces/types — `ComponentAttrs`, `PumSize`,
 * `PumColor` and `PumStyle` today. They are type-only on purpose, so they have
 * no runtime counterpart and must not count as phantom values.
 */
function typeOnlyReexports(dts: string): Set<string> {
  const names = new Set<string>()
  for (const match of dts.matchAll(/export\s*\{([^}]*)\}\s*from\s*'([^']+)'/g)) {
    const target = match[2].startsWith('.') ? resolveFile(match[2]) : null
    if (!target) continue
    const types = declaredTypes(readFileSync(target, 'utf8'))
    for (const entry of match[1].split(',')) {
      const name = entry.trim().split(/\s+as\s+/).pop()!.trim()
      if (types.has(name)) names.add(name)
    }
  }
  return names
}

const readSrc = (file: string) => readFileSync(join(SRC, file), 'utf8')
const ROOT = join(import.meta.dir, '..')

/** `ButtonGroup` → `button-group`, `FAB` → `fab`, `OTP` → `otp`. */
const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

describe('published types', () => {
  test('every runtime export of the barrel is declared', () => {
    const runtime = valueExports(readSrc('index.js'))
    const declared = new Set([...valueExports(readSrc('index.d.ts')), ...declaredTypes(readSrc('index.d.ts'))])
    const missing = [...runtime].filter((name) => !declared.has(name)).sort()

    expect(missing, `exportados por src/index.js y ausentes en src/index.d.ts: ${missing.join(', ')}`).toEqual([])
  })

  test('every module the barrel re-exports from exists', () => {
    const dangling = relativeSpecs(readSrc('index.d.ts')).filter((spec) => !resolves(spec)).sort()

    expect(dangling, `módulos inexistentes en src/index.d.ts: ${dangling.join(', ')}`).toEqual([])
  })

  test('the barrel does not promise runtime values that do not exist', () => {
    const runtime = valueExports(readSrc('index.js'))
    const barrel = readSrc('index.d.ts')
    const typed = valueExports(barrel)
    // A name may legitimately be type-only: either written as `export type {…}`
    // (which valueExports skips) or re-exported without the keyword from a
    // module that declares it as an interface/type.
    const typeOnly = new Set([...declaredTypes(barrel), ...typeOnlyReexports(barrel)])
    const phantom = [...typed].filter((name) => !runtime.has(name) && !typeOnly.has(name)).sort()

    expect(phantom, `declarados como valor y ausentes en src/index.js: ${phantom.join(', ')}`).toEqual([])
  })

  test('each component declares the values its index.js exports', () => {
    const gaps: string[] = []
    const folders = readdirSync(COMPONENTS, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort()

    for (const folder of folders) {
      const js = join(COMPONENTS, folder, 'index.js')
      const dts = join(COMPONENTS, folder, 'index.d.ts')
      if (!existsSync(js)) continue
      if (!existsSync(dts)) {
        gaps.push(`${folder}: no index.d.ts`)
        continue
      }
      const values = valueExports(readFileSync(js, 'utf8'))
      const declared = valueExports(readFileSync(dts, 'utf8'))
      const missing = [...values].filter((name) => !declared.has(name)).sort()
      if (missing.length > 0) gaps.push(`${folder}: ${missing.join(', ')}`)
    }

    expect(gaps, `componentes con valores sin declarar:\n  ${gaps.join('\n  ')}`).toEqual([])
  })

  /**
   * `package.json`'s `exports` map is hand-maintained (no script writes it), so
   * it drifts: `Dropdown` was the one component out of 72 with no `./dropdown`
   * subpath, while the guide documents lowercase-kebab subpaths for every
   * component (`panda-ui-mithril/button`). Nothing caught it, and a consumer
   * importing `panda-ui-mithril/dropdown` got ERR_PACKAGE_PATH_NOT_EXPORTED.
   */
  test('every component has a lowercase-kebab subpath export', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
    const exported = new Set(Object.keys(pkg.exports))
    const missing = readdirSync(COMPONENTS, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((name) => !exported.has(`./${kebab(name)}`))
      .sort()

    expect(missing, `componentes sin subpath en exports: ${missing.join(', ')}`).toEqual([])
  })

  test('every exports target exists on disk', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
    const dangling: string[] = []

    for (const [subpath, target] of Object.entries<Record<string, string>>(pkg.exports)) {
      for (const condition of Object.keys(target)) {
        if (condition === 'types' || condition === 'import') continue
        dangling.push(`${subpath}: condición desconocida "${condition}"`)
      }
      for (const path of Object.values(target)) {
        if (!existsSync(join(ROOT, path))) dangling.push(`${subpath}: ${path}`)
      }
    }

    expect(dangling, `exports que apuntan a nada:\n  ${dangling.join('\n  ')}`).toEqual([])
  })
})
