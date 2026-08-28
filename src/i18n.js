/**
 * i18n de la librería — strings internos de los componentes (estado vacío,
 * aria-labels, ...) en inglés (default) y español. El consumidor elige el
 * idioma con `setLocale('es')` y repinta (`m.redraw()`); la elección se
 * persiste en localStorage bajo la clave `pum-lang` y se restaura al cargar.
 *
 *   import { setLocale } from 'panda-ui-mithril'
 *   setLocale('es')
 *   m.redraw()
 *
 * Las claves son planas y con fallback a inglés: si falta la clave en el
 * locale activo se usa `en`; si falta en ambos, se devuelve la propia clave.
 */

const STORAGE_KEY = 'pum-lang'

/** Lee el locale persistido por el usuario (fallback: 'en'). */
function readStoredLocale() {
  try {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    return stored === 'es' ? 'es' : 'en'
  } catch {
    return 'en'
  }
}

/** @type {'en' | 'es'} */
let currentLocale = readStoredLocale()

/** @type {Record<string, Record<string, string>>} */
const messages = {
  en: {
    'table.empty': 'No data',
    'pagination.ariaLabel': 'Pagination',
  },
  es: {
    'table.empty': 'Sin datos',
    'pagination.ariaLabel': 'Paginación',
  },
}

/**
 * Establece el idioma de la librería ('en' | 'es') y lo persiste en
 * localStorage (`pum-lang`). Requiere `m.redraw()` del consumidor para
 * repintar los componentes con los nuevos strings.
 * @param {'en' | 'es'} locale
 */
export function setLocale(locale) {
  currentLocale = locale === 'es' ? 'es' : 'en'
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, currentLocale)
  } catch {
    // storage no disponible (SSR, modo privado) — la elección no persiste.
  }
}

/**
 * Devuelve el idioma activo de la librería (persistido en `pum-lang`).
 * @returns {'en' | 'es'}
 */
export function getLocale() {
  return currentLocale
}

/**
 * Resuelve una clave de mensaje en el locale activo (fallback: en, luego la
 * propia clave). Interno de la librería.
 * @param {string} key
 * @returns {string}
 */
export function t(key) {
  const table = messages[currentLocale] || messages.en
  if (table[key] != null) return table[key]
  if (messages.en[key] != null) return messages.en[key]
  return key
}
