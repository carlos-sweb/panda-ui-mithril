/**
 * postcss-schemas — per-postcss-plugin OPTIONS schemas.
 *
 * The official catalog (postcss.org) does not expose which options each
 * plugin accepts; that information lives in the package (README / .d.ts /
 * code with `Object.assign({...}, opts)` defaults). So that the UI can
 * generate a typed editor per plugin, this module keeps a CURATED REGISTRY:
 * each plugin declares the schema of its options (key, type, enum, default…).
 *
 * The option types model what can be persisted in `postcss.json`
 * (pure JSON):
 *   string | number | boolean | enum | array (of strings) |
 *   regex (stored as the text "/pattern/flags") | json (free object)
 *
 * FUNCTION options (e.g. postcss-url `url` as a callback, import
 * `resolve`/`load`) are NOT serializable: they are declared with
 * `editable: false` so they show with a note that they live in the build
 * code, never in the editor JSON.
 *
 * Plugins without a schema → the UI uses a free JSON editor (universal
 * fallback), and `detectOptionsUsage` (a heuristic over the installed
 * package code) decides whether the plugin even "accepts options" first.
 */

/** Valid values for the UI switch per option type. */
export type PostcssOptionType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'enum'
  | 'array'
  | 'regex'
  | 'json'
  | 'function'

/** An enum entry: real value (string|number|boolean) + visible label. */
export interface PostcssOptionEnumValue {
  value: string | number | boolean
  label: string
}

/** An editable field of a plugin's options schema. */
export interface PostcssOptionSchema {
  /** Option key as the plugin reads it (e.g. `assetsPath`). */
  key: string
  /** Short label for the UI (default: the key). */
  label?: string
  /** Brief description for tooltip/help. */
  description?: string
  /** Edit type in the UI + serialization. */
  type: PostcssOptionType
  /** Allowed values when type === 'enum' (real value + label). */
  enum?: PostcssOptionEnumValue[]
  /** Plugin default (informational only; not written unless touched). */
  default?: unknown
  /** Placeholder for inputs. */
  placeholder?: string
  /**
   * false → option not editable from JSON (functions, non-serializable
   * objects): it shows in the UI as a warning, it is never persisted.
   * Default: true.
   */
  editable?: boolean
}

/** Full schema of a pipeline plugin. */
export interface PostcssPluginSchema {
  /** npm package (catalog/installed id). */
  id: string
  /** Visible name (default: id). */
  name?: string
  /** Brief plugin description (for the editor). */
  description?: string
  /** Editable plugin options, in UI order. */
  options: PostcssOptionSchema[]
  /** Informational notes shown below the editor (function options, etc.). */
  notes?: string[]
}

/** Curated registry: package id → schema. */
const SCHEMAS: Record<string, PostcssPluginSchema> = {}

/** Registers a schema (prevents silent duplicates in the registry). */
function define(schema: PostcssPluginSchema): PostcssPluginSchema {
  if (SCHEMAS[schema.id]) {
    throw new Error(`postcss-schemas: duplicate schema for '${schema.id}'`)
  }
  SCHEMAS[schema.id] = schema
  return schema
}

// ── @pandacss/dev/postcss (Panda base, always first) ─────────────────────────
// The Panda plugin accepts configPath + cwd (same as the repo's build-css.ts
// with resolve(ROOT, 'panda.config.ts') / ROOT). The runner resolves them
// against projectRoot; here they are exposed to manually pin a panda config
// file different from the root panda.config.ts.
define({
  id: '@pandacss/dev/postcss',
  name: 'Panda (base)',
  description: 'Panda CSS as a PostCSS plugin — emits preflight, tokens, recipes and utilities into the @layer directive.',
  notes: [
    'Pipeline base: it cannot be removed. Without configPath, Panda looks for panda.config.{ts,js,mts} in cwd automatically.',
  ],
  options: [
    {
      key: 'configPath',
      type: 'string',
      placeholder: 'panda.config.ts',
      description: 'Path to the Panda config (relative to cwd). Empty = auto-detection at the project root.',
    },
    {
      key: 'cwd',
      type: 'string',
      placeholder: '.',
      description: 'Base directory of the Panda project (relative to the root). Empty = project root.',
    },
  ],
})

// ── postcss-url ──────────────────────────────────────────────────────────────
// Modes: url: 'rebase' (default) | 'inline' | 'copy' | function (not editable).
// Filter: minimatch string | RegExp | function (not editable). copy uses
// assetsPath (relative to `to`) + useHash; inline uses maxSize (KB) and fallback.
define({
  id: 'postcss-url',
  description: 'Rebase, inline or copy url() assets.',
  notes: [
    'The `url` option also accepts a custom function — if you need it, configure it in the build code (it is not editable from JSON).',
    'An ARRAY of configurations can be passed (each with its own filter) — the editor manages only one; several are configured in code.',
  ],
  options: [
    {
      key: 'url',
      type: 'enum',
      enum: [
        { value: 'rebase', label: 'rebase (default)' },
        { value: 'inline', label: 'inline (base64)' },
        { value: 'copy', label: 'copy (copies to assetsPath)' },
      ],
      default: 'rebase',
      description: 'Processing mode for url(): relative rebase, inline base64 or copy with hash.',
    },
    {
      key: 'filter',
      type: 'regex',
      placeholder: '/\\.(woff2?|eot|ttf|otf)(\\?.*)?$/',
      description: 'Pattern (RegExp or minimatch) that decides which assets are processed.',
    },
    {
      key: 'assetsPath',
      type: 'string',
      placeholder: 'fonts',
      description: 'Destination folder for copied assets (relative to the output CSS).',
    },
    {
      key: 'useHash',
      type: 'boolean',
      default: false,
      description: 'Adds a hash to the copied asset name (cache-busting).',
    },
    {
      key: 'maxSize',
      type: 'number',
      placeholder: '20',
      description: 'Maximum size in KB for inline (inline mode only).',
    },
    {
      key: 'basePath',
      type: 'string',
      description: 'Base folder for resolving assets (default: dirname of the input CSS).',
    },
    {
      key: 'fallback',
      type: 'string',
      description: 'Fallback URL when the asset cannot be processed.',
    },
    {
      key: 'multi',
      type: 'boolean',
      default: false,
      description: 'Allows passing an array of configurations (only with url as a function).',
    },
    {
      key: 'hashOptions',
      type: 'json',
      description: 'Hash options (e.g. { "method": "xxhash32", "shrink": 8 }).',
    },
  ],
})

// ── postcss-import ───────────────────────────────────────────────────────────
define({
  id: 'postcss-import',
  description: 'Inline @import rules (resolve + bundle).',
  options: [
    {
      key: 'root',
      type: 'string',
      placeholder: 'process.cwd()',
      description: 'Root for resolving @imports (default: process.cwd()).',
    },
    {
      key: 'path',
      type: 'array',
      default: [],
      description: 'Additional folders to look for modules in (besides node_modules).',
    },
    {
      key: 'skipDuplicates',
      type: 'boolean',
      default: true,
      description: 'Prevents importing the same file twice.',
    },
    {
      key: 'warnOnEmpty',
      type: 'boolean',
      default: true,
      description: 'Warns when an @import resolves to an empty file.',
    },
    {
      key: 'addModulesDirectories',
      type: 'array',
      default: [],
      description: 'Extra node_modules-like directories for resolving packages.',
    },
    {
      key: 'resolve',
      type: 'function',
      editable: false,
      description: 'Custom resolver (id, base, options) => path — not editable from JSON.',
    },
    {
      key: 'load',
      type: 'function',
      editable: false,
      description: 'Custom content loader — not editable from JSON.',
    },
    {
      key: 'plugins',
      type: 'json',
      description: 'PostCSS plugins to apply to the imported CSS (array).',
    },
  ],
})

// ── postcss-prune-var ────────────────────────────────────────────────────────
define({
  id: 'postcss-prune-var',
  description: 'Remove CSS custom properties that are never used.',
  options: [
    {
      key: 'skip',
      type: 'array',
      default: [],
      placeholder: 'node_modules/**',
      description: 'Globs of files/folders to exclude from the analysis.',
    },
  ],
})

// ── postcss-nesting ──────────────────────────────────────────────────────────
define({
  id: 'postcss-nesting',
  description: 'Unwrap CSS nesting syntax.',
  options: [
    {
      key: 'edition',
      type: 'enum',
      enum: [
        { value: '2024-02', label: '2024-02 (default, current spec)' },
        { value: '2021', label: '2021 (supports @nest)' },
      ],
      default: '2024-02',
      description: 'Edition of the CSS Nesting spec to compile to.',
    },
    {
      key: 'noIsPseudoSelector',
      type: 'boolean',
      default: false,
      description: 'Do not use :is() when combining selectors (repeated selectors).',
    },
    {
      key: 'silenceAtNestWarning',
      type: 'boolean',
      default: false,
      description: 'Silences the warning that @nest will be removed in the next major.',
    },
  ],
})

// ── autoprefixer ─────────────────────────────────────────────────────────────
// Full interface typed in node_modules/autoprefixer/lib/autoprefixer.d.ts.
define({
  id: 'autoprefixer',
  description: 'Add vendor prefixes using data from Can I Use.',
  options: [
    {
      key: 'env',
      type: 'string',
      description: 'Browserslist environment to use.',
    },
    {
      key: 'cascade',
      type: 'boolean',
      default: true,
      description: 'Uses the visual cascade if the CSS is not minified.',
    },
    {
      key: 'add',
      type: 'boolean',
      default: true,
      description: 'Adds prefixes.',
    },
    {
      key: 'remove',
      type: 'boolean',
      default: true,
      description: 'Removes obsolete prefixes.',
    },
    {
      key: 'supports',
      type: 'boolean',
      default: true,
      description: 'Adds prefixes to @supports parameters.',
    },
    {
      key: 'flexbox',
      type: 'enum',
      enum: [
        { value: true, label: 'true (default)' },
        { value: false, label: 'false (no flexbox)' },
        { value: 'no-2009', label: 'no-2009 (without the 2009 spec)' },
      ],
      default: true,
      description: 'Flexbox prefixes (accepts boolean or "no-2009").',
    },
    {
      key: 'grid',
      type: 'enum',
      enum: [
        { value: true, label: 'true (default)' },
        { value: false, label: 'false (no IE grid)' },
        { value: 'autoplace', label: 'autoplace' },
        { value: 'no-autoplace', label: 'no-autoplace' },
      ],
      default: true,
      description: 'Grid Layout prefixes for IE 10-11.',
    },
    {
      key: 'stats',
      type: 'json',
      description: 'Custom usage statistics for queries like "> 10% in my stats".',
    },
    {
      key: 'overrideBrowserslist',
      type: 'array',
      placeholder: 'last 2 versions',
      description: 'Target Browserslist queries (better in .browserslistrc).',
    },
    {
      key: 'ignoreUnknownVersions',
      type: 'boolean',
      default: false,
      description: 'Do not throw an error if Browserslist mentions an unknown version.',
    },
  ],
})

// ── postcss-reporter ─────────────────────────────────────────────────────────
define({
  id: 'postcss-reporter',
  description: 'Log PostCSS messages to the console.',
  options: [
    {
      key: 'clearReportedMessages',
      type: 'boolean',
      default: false,
      description: 'Clears messages already reported from result.messages.',
    },
    {
      key: 'clearAllMessages',
      type: 'boolean',
      default: false,
      description: 'Clears all messages after reporting.',
    },
    {
      key: 'noIcon',
      type: 'boolean',
      default: false,
      description: 'Do not show colored icons in the log.',
    },
    {
      key: 'noPlugin',
      type: 'boolean',
      default: false,
      description: 'Do not show the plugin name on each line.',
    },
    {
      key: 'sortByPosition',
      type: 'boolean',
      default: false,
      description: 'Sorts messages by position in the file.',
    },
    {
      key: 'plugins',
      type: 'array',
      placeholder: '!postcss-foo (denylist) or postcss-foo (allowlist)',
      description: 'Filter by plugin: allowlist by default; "!" prefix = denylist.',
    },
    {
      key: 'filter',
      type: 'function',
      editable: false,
      description: 'Custom message filter (function) — not editable from JSON; it lives in the build code.',
    },
    {
      key: 'formatter',
      type: 'function',
      editable: false,
      description: 'Custom formatter (function) — not editable from JSON; it lives in the build code.',
    },
  ],
})

// ── @csstools/postcss-cascade-layers ─────────────────────────────────────────
define({
  id: '@csstools/postcss-cascade-layers',
  description: 'Support cascade layers in older browsers.',
  options: [
    {
      key: 'onRevertLayerKeyword',
      type: 'enum',
      enum: [
        { value: 'warn', label: 'warn (default)' },
        { value: false, label: 'false (silent)' },
      ],
      default: 'warn',
      description: 'Warns if revert-layer is used (not transformable for old browsers).',
    },
    {
      key: 'onConditionalRulesChangingLayerOrder',
      type: 'enum',
      enum: [
        { value: 'warn', label: 'warn (default)' },
        { value: false, label: 'false (silent)' },
      ],
      default: 'warn',
      description: 'Warns if @media changes the layer order (not transformable).',
    },
  ],
})

// ── cssnano (installed in the repo; preset pack) ─────────────────────────────
// cssnano only ships `cssnano-preset-default` as a real dependency; the
// 'lite'/'advanced' presets require installing cssnano-preset-lite/
// cssnano-preset-advanced separately (they are not in the postcss.org
// catalog, so the UI cannot install them) → the enum only offers what works.
define({
  id: 'cssnano',
  description: 'Optimize CSS for production (preset pack).',
  notes: [
    'Only the `default` preset is guaranteed (a cssnano dependency). `lite` and `advanced` require installing the cssnano-preset-lite / cssnano-preset-advanced package by hand.',
  ],
  options: [
    {
      key: 'preset',
      type: 'enum',
      enum: [
        { value: 'default', label: 'default' },
      ],
      default: 'default',
      description: 'cssnano optimization preset (default: recommended).',
    },
  ],
})

// ── @fullhuman/postcss-purgecss (installed) ──────────────────────────────────
define({
  id: '@fullhuman/postcss-purgecss',
  description: 'Remove unused CSS (PurgeCSS).',
  options: [
    {
      key: 'content',
      type: 'array',
      placeholder: './src/**/*.{js,jsx,ts,html}',
      description: 'Globs of files whose text is used to detect live classes.',
    },
    {
      key: 'defaultExtractor',
      type: 'function',
      editable: false,
      description: 'Custom extractor (function) — not editable from JSON; it lives in the build code.',
    },
    {
      key: 'safelist',
      type: 'json',
      description: 'Selectors that are never removed (array or {standard, deep, greedy}).',
    },
    {
      key: 'variables',
      type: 'boolean',
      default: false,
      description: 'Also purges unused CSS variables.',
    },
    {
      key: 'keyframes',
      type: 'boolean',
      default: false,
      description: 'Also purges unused keyframes.',
    },
  ],
})

/** Panda base plugin (always the first entry of the managed block). */
export const PANDA_PLUGIN_ID = '@pandacss/dev/postcss'

/** Returns a plugin's curated schema; null if not registered. */
export function schemaFor(id: string): PostcssPluginSchema | null {
  return SCHEMAS[id] || null
}

/** Ids with a curated schema (to mark "configurable" in the catalog). */
export function curatedPluginIds(): string[] {
  return Object.keys(SCHEMAS)
}

/** Editable (persistable) options of a schema. */
export function editableOptions(schema: PostcssPluginSchema): PostcssOptionSchema[] {
  return schema.options.filter((o) => o.editable !== false)
}

/**
 * Heuristic: does the installed package use options? It reads the package
 * entry (main) and looks for typical defaults/option-usage patterns
 * (`options = {...}`, `Object.assign({`, `opts = {}`, `options.` accesses).
 * It is meant for plugins WITHOUT a curated schema: with no trace of
 * options, the UI offers no editor (zero-config plugin).
 */
export function detectOptionsUsage(entrySource: string): boolean {
  if (!entrySource) return false
  const head = entrySource.slice(0, 60_000)
  const patterns = [
    /options\s*=\s*\{/,
    /opts\s*=\s*\{/,
    /Object\.assign\s*\(\s*\{/,
    /options\s*=\s*options\s*\|\|\s*\{/,
    /\bopts\s*=\s*opts\s*\|\|\s*\{/,
    /\(\s*options\s*=\s*\{\s*\}\)/,
    /\(\s*opts\s*=\s*\{\s*\}\)/,
  ]
  if (patterns.some((re) => re.test(head))) return true
  // Property access to options (options.x / opts.x) with no visible defaults.
  return /\b(?:options|opts)\.[a-zA-Z_$]/.test(head)
}
