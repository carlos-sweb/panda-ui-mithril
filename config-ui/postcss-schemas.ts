/**
 * postcss-schemas — esquemas de OPCIONES por plugin postcss.
 *
 * El catálogo oficial (postcss.org) no expone qué opciones acepta cada
 * plugin; la información vive en el paquete (README / .d.ts / código con
 * defaults `Object.assign({...}, opts)`). Para que la UI genere un editor
 * tipado por plugin, este módulo mantiene un REGISTRO CURADO: cada plugin
 * declara el esquema de sus opciones (clave, tipo, enum, default…).
 *
 * Los tipos de opción modelan lo que se puede persistir en `postcss.json`
 * (JSON puro):
 *   string | number | boolean | enum | array (de strings) |
 *   regex (guardado como texto "/patrón/flags") | json (objeto libre)
 *
 * Las opciones FUNCIÓN (p. ej. postcss-url `url` como callback, import
 * `resolve`/`load`) NO son serializables: se declaran con `editable: false`
 * para mostrarlas con nota de que viven en el código del build, nunca en el
 * JSON del editor.
 *
 * Plugins sin esquema → la UI usa un editor JSON libre (fallback universal),
 * y `detectOptionsUsage` (heurística sobre el código del paquete instalado)
 * decide si el plugin siquiera "acepta opciones" antes de ofrecer el editor.
 */

/** Valores válidos para el switch de la UI por tipo de opción. */
export type PostcssOptionType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'enum'
  | 'array'
  | 'regex'
  | 'json'
  | 'function'

/** Un valor de enum: value real (string|number|boolean) + etiqueta visible. */
export interface PostcssOptionEnumValue {
  value: string | number | boolean
  label: string
}

/** Un campo editable del esquema de opciones de un plugin. */
export interface PostcssOptionSchema {
  /** Clave de la opción tal como la lee el plugin (p. ej. `assetsPath`). */
  key: string
  /** Etiqueta corta para la UI (default: la key). */
  label?: string
  /** Descripción breve para tooltip/help. */
  description?: string
  /** Tipo de edición en la UI + serialización. */
  type: PostcssOptionType
  /** Valores permitidos cuando type === 'enum' (value real + label). */
  enum?: PostcssOptionEnumValue[]
  /** Default del plugin (solo informativo; no se escribe si no se toca). */
  default?: unknown
  /** Placeholder para inputs. */
  placeholder?: string
  /**
   * false → opción no editable desde JSON (funciones, objetos no
   * serializables): se muestra en la UI como aviso, nunca se persiste.
   * Default: true.
   */
  editable?: boolean
}

/** Esquema completo de un plugin del pipeline. */
export interface PostcssPluginSchema {
  /** Paquete npm (id del catálogo/instalado). */
  id: string
  /** Nombre visible (default: id). */
  name?: string
  /** Descripción breve del plugin (para el editor). */
  description?: string
  /** Opciones editables del plugin, en orden de la UI. */
  options: PostcssOptionSchema[]
  /** Notas informativas mostradas bajo el editor (opciones función, etc.). */
  notes?: string[]
}

/** Registro curado: id de paquete → esquema. */
const SCHEMAS: Record<string, PostcssPluginSchema> = {}

/** Registra un esquema (evita duplicados silenciosos en el registro). */
function define(schema: PostcssPluginSchema): PostcssPluginSchema {
  if (SCHEMAS[schema.id]) {
    throw new Error(`postcss-schemas: esquema duplicado para '${schema.id}'`)
  }
  SCHEMAS[schema.id] = schema
  return schema
}

// ── postcss-url ──────────────────────────────────────────────────────────────
// Modos: url: 'rebase' (default) | 'inline' | 'copy' | función (no editable).
// Filtro: string minimatch | RegExp | función (no editable). copy usa
// assetsPath (relativo a `to`) + useHash; inline usa maxSize (KB) y fallback.
define({
  id: 'postcss-url',
  description: 'Rebase, inline or copy url() assets.',
  notes: [
    'La opción `url` también acepta una función custom — si la necesitas, configúrala en el código del build (no es editable desde JSON).',
    'Se puede pasar un ARRAY de configuraciones (cada una con su filter) — el editor gestiona una sola; varias se configuran en código.',
  ],
  options: [
    {
      key: 'url',
      type: 'enum',
      enum: [
        { value: 'rebase', label: 'rebase (default)' },
        { value: 'inline', label: 'inline (base64)' },
        { value: 'copy', label: 'copy (copia a assetsPath)' },
      ],
      default: 'rebase',
      description: 'Modo de procesado de los url(): rebase relativo, inline en base64 o copia con hash.',
    },
    {
      key: 'filter',
      type: 'regex',
      placeholder: '/\\.(woff2?|eot|ttf|otf)(\\?.*)?$/',
      description: 'Patrón (RegExp o minimatch) que decide qué assets se procesan.',
    },
    {
      key: 'assetsPath',
      type: 'string',
      placeholder: 'fonts',
      description: 'Carpeta destino de los assets copiados (relativa al CSS de salida).',
    },
    {
      key: 'useHash',
      type: 'boolean',
      default: false,
      description: 'Añade un hash al nombre del asset copiado (cache-busting).',
    },
    {
      key: 'maxSize',
      type: 'number',
      placeholder: '20',
      description: 'Tamaño máximo en KB para inline (solo modo inline).',
    },
    {
      key: 'basePath',
      type: 'string',
      description: 'Carpeta base para resolver assets (default: dirname del CSS de entrada).',
    },
    {
      key: 'fallback',
      type: 'string',
      description: 'URL de respaldo cuando el asset no se puede procesar.',
    },
    {
      key: 'multi',
      type: 'boolean',
      default: false,
      description: 'Permite pasar un array de configuraciones (solo con url función).',
    },
    {
      key: 'hashOptions',
      type: 'json',
      description: 'Opciones del hash (p. ej. { "method": "xxhash32", "shrink": 8 }).',
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
      description: 'Raíz para resolver los @import (default: process.cwd()).',
    },
    {
      key: 'path',
      type: 'array',
      default: [],
      description: 'Carpetas adicionales donde buscar módulos (además de node_modules).',
    },
    {
      key: 'skipDuplicates',
      type: 'boolean',
      default: true,
      description: 'Evita importar el mismo archivo dos veces.',
    },
    {
      key: 'warnOnEmpty',
      type: 'boolean',
      default: true,
      description: 'Avisa cuando un @import resuelve a un archivo vacío.',
    },
    {
      key: 'addModulesDirectories',
      type: 'array',
      default: [],
      description: 'Directorios extra tipo node_modules para resolver paquetes.',
    },
    {
      key: 'resolve',
      type: 'function',
      editable: false,
      description: 'Resolvedor custom (id, base, options) => path — no editable desde JSON.',
    },
    {
      key: 'load',
      type: 'function',
      editable: false,
      description: 'Cargador custom de contenido — no editable desde JSON.',
    },
    {
      key: 'plugins',
      type: 'json',
      description: 'Plugins postcss a aplicar sobre el CSS importado (array).',
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
      description: 'Globs de archivos/carpetas a excluir del análisis.',
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
        { value: '2024-02', label: '2024-02 (default, spec actual)' },
        { value: '2021', label: '2021 (soporta @nest)' },
      ],
      default: '2024-02',
      description: 'Edición de la spec de CSS Nesting a la que compilar.',
    },
    {
      key: 'noIsPseudoSelector',
      type: 'boolean',
      default: false,
      description: 'No usar :is() al combinar selectores (selectores repetidos).',
    },
    {
      key: 'silenceAtNestWarning',
      type: 'boolean',
      default: false,
      description: 'Silencia el aviso de que @nest se eliminará en la próxima major.',
    },
  ],
})

// ── autoprefixer ─────────────────────────────────────────────────────────────
// Interfaz completa tipada en node_modules/autoprefixer/lib/autoprefixer.d.ts.
define({
  id: 'autoprefixer',
  description: 'Add vendor prefixes using data from Can I Use.',
  options: [
    {
      key: 'env',
      type: 'string',
      description: 'Entorno de Browserslist a usar.',
    },
    {
      key: 'cascade',
      type: 'boolean',
      default: true,
      description: 'Usa el cascade visual si el CSS no está comprimido.',
    },
    {
      key: 'add',
      type: 'boolean',
      default: true,
      description: 'Añade prefijos.',
    },
    {
      key: 'remove',
      type: 'boolean',
      default: true,
      description: 'Elimina prefijos obsoletos.',
    },
    {
      key: 'supports',
      type: 'boolean',
      default: true,
      description: 'Añade prefijos a los parámetros de @supports.',
    },
    {
      key: 'flexbox',
      type: 'enum',
      enum: [
        { value: true, label: 'true (default)' },
        { value: false, label: 'false (sin flexbox)' },
        { value: 'no-2009', label: 'no-2009 (sin spec 2009)' },
      ],
      default: true,
      description: 'Prefijos de flexbox (acepta boolean o "no-2009").',
    },
    {
      key: 'grid',
      type: 'enum',
      enum: [
        { value: true, label: 'true (default)' },
        { value: false, label: 'false (sin grid IE)' },
        { value: 'autoplace', label: 'autoplace' },
        { value: 'no-autoplace', label: 'no-autoplace' },
      ],
      default: true,
      description: 'Prefijos de Grid Layout para IE 10-11.',
    },
    {
      key: 'stats',
      type: 'json',
      description: 'Estadísticas de uso custom para queries como "> 10% in my stats".',
    },
    {
      key: 'overrideBrowserslist',
      type: 'array',
      placeholder: 'last 2 versions',
      description: 'Queries de Browserslist objetivo (mejor en .browserslistrc).',
    },
    {
      key: 'ignoreUnknownVersions',
      type: 'boolean',
      default: false,
      description: 'No lanzar error si Browserslist menciona una versión desconocida.',
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
      description: 'Limpia los mensajes ya reportados de result.messages.',
    },
    {
      key: 'clearAllMessages',
      type: 'boolean',
      default: false,
      description: 'Limpia todos los mensajes tras reportar.',
    },
    {
      key: 'noIcon',
      type: 'boolean',
      default: false,
      description: 'No mostrar iconos de color en el log.',
    },
    {
      key: 'noPlugin',
      type: 'boolean',
      default: false,
      description: 'No mostrar el nombre del plugin en cada línea.',
    },
    {
      key: 'sortByPosition',
      type: 'boolean',
      default: false,
      description: 'Ordena los mensajes por posición en el archivo.',
    },
    {
      key: 'plugins',
      type: 'array',
      placeholder: '!postcss-foo (denylist) o postcss-foo (allowlist)',
      description: 'Filtro por plugin: allowlist por defecto; prefijo "!" = denylist.',
    },
    {
      key: 'filter',
      type: 'function',
      editable: false,
      description: 'Filtro custom de mensajes (función) — no editable desde JSON; vive en el código del build.',
    },
    {
      key: 'formatter',
      type: 'function',
      editable: false,
      description: 'Formatter custom (función) — no editable desde JSON; vive en el código del build.',
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
        { value: false, label: 'false (silencioso)' },
      ],
      default: 'warn',
      description: 'Avisa si se usa revert-layer (no transformable a navegadores viejos).',
    },
    {
      key: 'onConditionalRulesChangingLayerOrder',
      type: 'enum',
      enum: [
        { value: 'warn', label: 'warn (default)' },
        { value: false, label: 'false (silencioso)' },
      ],
      default: 'warn',
      description: 'Avisa si @media cambia el orden de las capas (no transformable).',
    },
  ],
})

// ── cssnano (instalado en el repo; preset pack) ──────────────────────────────
define({
  id: 'cssnano',
  description: 'Optimize CSS for production (preset pack).',
  options: [
    {
      key: 'preset',
      type: 'enum',
      enum: [
        { value: 'default', label: 'default' },
        { value: 'lite', label: 'lite' },
        { value: 'advanced', label: 'advanced' },
      ],
      default: 'default',
      description: 'Preset de optimización de cssnano.',
    },
  ],
})

// ── @fullhuman/postcss-purgecss (instalado) ──────────────────────────────────
define({
  id: '@fullhuman/postcss-purgecss',
  description: 'Remove unused CSS (PurgeCSS).',
  options: [
    {
      key: 'content',
      type: 'array',
      placeholder: './src/**/*.{js,jsx,ts,html}',
      description: 'Globs de archivos cuyo texto se usa para detectar clases vivas.',
    },
    {
      key: 'defaultExtractor',
      type: 'function',
      editable: false,
      description: 'Extractor custom (función) — no editable desde JSON; vive en el código del build.',
    },
    {
      key: 'safelist',
      type: 'json',
      description: 'Selectores que nunca se eliminan (array o {standard, deep, greedy}).',
    },
    {
      key: 'variables',
      type: 'boolean',
      default: false,
      description: 'También purga variables CSS no usadas.',
    },
    {
      key: 'keyframes',
      type: 'boolean',
      default: false,
      description: 'También purga keyframes no usados.',
    },
  ],
})

/** Plugin base de Panda (siempre primera entrada del bloque gestionado). */
export const PANDA_PLUGIN_ID = '@pandacss/dev/postcss'

/** Devuelve el esquema curado de un plugin; null si no está registrado. */
export function schemaFor(id: string): PostcssPluginSchema | null {
  return SCHEMAS[id] || null
}

/** Ids con esquema curado (para marcar "configurable" en el catálogo). */
export function curatedPluginIds(): string[] {
  return Object.keys(SCHEMAS)
}

/** Opciones editables (persistibles) de un esquema. */
export function editableOptions(schema: PostcssPluginSchema): PostcssOptionSchema[] {
  return schema.options.filter((o) => o.editable !== false)
}

/**
 * Heurística: ¿el paquete instalado usa opciones? Lee el entry (main) del
 * paquete y busca patrones típicos de defaults/uso de opciones
 * (`options = {...}`, `Object.assign({`, `opts = {}`, accesos `options.`).
 * Sirve para plugins SIN esquema curado: si no hay rastro de opciones, la UI
 * no ofrece editor (plugin zero-config).
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
  // Acceso a opciones por propiedad (options.x / opts.x) sin defaults visibles.
  return /\b(?:options|opts)\.[a-zA-Z_$]/.test(head)
}
