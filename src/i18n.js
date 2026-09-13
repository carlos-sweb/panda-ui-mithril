/**
 * Library i18n — internal component strings (empty state, aria-labels, ...)
 * in English (default) and Spanish. The consumer picks the language with
 * `setLocale('es')` and repaints (`m.redraw()`); the choice is persisted in
 * localStorage under the `pum-lang` key and restored on load.
 *
 *   import { setLocale } from 'panda-ui-mithril'
 *   setLocale('es')
 *   m.redraw()
 *
 * Keys are flat and fall back to English: if the key is missing in the active
 * locale `en` is used; if missing in both, the key itself is returned.
 */

const STORAGE_KEY = 'pum-lang'

/** Reads the locale persisted by the user (fallback: 'en'). */
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
    'table.rowsPerPage': 'Rows per page',
    'pagination.ariaLabel': 'Pagination',
    'colorpicker.copy': 'Copy color',
    'colorpicker.copied': 'Copied!',
    'colorpicker.close': 'Close',
    'colorpicker.hexLabel': 'Hex value',
    'colorpicker.modePicker': 'Picker',
    'colorpicker.gradientLabel': 'Saturation and brightness',
    'colorpicker.hueLabel': 'Hue',
    'colorpicker.channel.hue': 'Hue',
    'colorpicker.channel.saturation': 'Saturation',
    'colorpicker.channel.brightness': 'Brightness',
    'colorpicker.channel.lightness': 'Lightness',
    'colorpicker.channel.red': 'Red',
    'colorpicker.channel.green': 'Green',
    'colorpicker.channel.blue': 'Blue',
    'colorpicker.channel.cyan': 'Cyan',
    'colorpicker.channel.magenta': 'Magenta',
    'colorpicker.channel.yellow': 'Yellow',
    'colorpicker.channel.key': 'Key',
    'colorpicker.channel.luminance': 'Luminance',
    'colorpicker.channel.a': 'a',
    'colorpicker.channel.b': 'b',
    'calendar.previous': 'Previous',
    'calendar.next': 'Next',
    'calendar.month.january': 'January',
    'calendar.month.february': 'February',
    'calendar.month.march': 'March',
    'calendar.month.april': 'April',
    'calendar.month.may': 'May',
    'calendar.month.june': 'June',
    'calendar.month.july': 'July',
    'calendar.month.august': 'August',
    'calendar.month.september': 'September',
    'calendar.month.october': 'October',
    'calendar.month.november': 'November',
    'calendar.month.december': 'December',
    'calendar.weekdayShort.sunday': 'Su',
    'calendar.weekdayShort.monday': 'Mo',
    'calendar.weekdayShort.tuesday': 'Tu',
    'calendar.weekdayShort.wednesday': 'We',
    'calendar.weekdayShort.thursday': 'Th',
    'calendar.weekdayShort.friday': 'Fr',
    'calendar.weekdayShort.saturday': 'Sa',
  },
  es: {
    'table.empty': 'Sin datos',
    'table.rowsPerPage': 'Filas por página',
    'pagination.ariaLabel': 'Paginación',
    'colorpicker.copy': 'Copiar color',
    'colorpicker.copied': '¡Copiado!',
    'colorpicker.close': 'Cerrar',
    'colorpicker.hexLabel': 'Valor hex',
    'colorpicker.modePicker': 'Selector',
    'colorpicker.gradientLabel': 'Saturación y brillo',
    'colorpicker.hueLabel': 'Tono',
    'colorpicker.channel.hue': 'Tono',
    'colorpicker.channel.saturation': 'Saturación',
    'colorpicker.channel.brightness': 'Brillo',
    'colorpicker.channel.lightness': 'Luminosidad',
    'colorpicker.channel.red': 'Rojo',
    'colorpicker.channel.green': 'Verde',
    'colorpicker.channel.blue': 'Azul',
    'colorpicker.channel.cyan': 'Cian',
    'colorpicker.channel.magenta': 'Magenta',
    'colorpicker.channel.yellow': 'Amarillo',
    'colorpicker.channel.key': 'Clave',
    'colorpicker.channel.luminance': 'Luminancia',
    'colorpicker.channel.a': 'a',
    'colorpicker.channel.b': 'b',
    'calendar.previous': 'Anterior',
    'calendar.next': 'Siguiente',
    'calendar.month.january': 'Enero',
    'calendar.month.february': 'Febrero',
    'calendar.month.march': 'Marzo',
    'calendar.month.april': 'Abril',
    'calendar.month.may': 'Mayo',
    'calendar.month.june': 'Junio',
    'calendar.month.july': 'Julio',
    'calendar.month.august': 'Agosto',
    'calendar.month.september': 'Septiembre',
    'calendar.month.october': 'Octubre',
    'calendar.month.november': 'Noviembre',
    'calendar.month.december': 'Diciembre',
    'calendar.weekdayShort.sunday': 'Do',
    'calendar.weekdayShort.monday': 'Lu',
    'calendar.weekdayShort.tuesday': 'Ma',
    'calendar.weekdayShort.wednesday': 'Mi',
    'calendar.weekdayShort.thursday': 'Ju',
    'calendar.weekdayShort.friday': 'Vi',
    'calendar.weekdayShort.saturday': 'Sa',
  },
}

/**
 * Sets the library language ('en' | 'es') and persists it in
 * localStorage (`pum-lang`). Requires the consumer's `m.redraw()` to
 * repaint the components with the new strings.
 * @param {'en' | 'es'} locale
 */
export function setLocale(locale) {
  currentLocale = locale === 'es' ? 'es' : 'en'
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, currentLocale)
  } catch {
    // storage unavailable (SSR, private mode) — the choice is not persisted.
  }
}

/**
 * Returns the library's active language (persisted in `pum-lang`).
 * @returns {'en' | 'es'}
 */
export function getLocale() {
  return currentLocale
}

/**
 * Resolves a message key in the active locale (fallback: en, then the
 * key itself). Internal to the library.
 * @param {string} key
 * @returns {string}
 */
export function t(key) {
  const table = messages[currentLocale] || messages.en
  if (table[key] != null) return table[key]
  if (messages.en[key] != null) return messages.en[key]
  return key
}
