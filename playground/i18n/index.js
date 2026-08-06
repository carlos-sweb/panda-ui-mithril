import m from 'mithril'
import sharedEn from './shared.en.yml'
import sharedEs from './shared.es.yml'
import { pageI18n } from './pages.generated.js'

const shared = { en: sharedEn, es: sharedEs }
const pages = { en: {}, es: {} }
let _currentPage = null

/** Resolve a dotted path ('sidebar.categories.layout') from an object. Returns the value or undefined on miss. */
function resolve(obj, path) {
  return path.split('.').reduce((o, k) => (o != null ? o[k] : undefined), obj)
}

/** Active language: reads m.route.param('lang'), falls back to localStorage, then 'en'. */
export function currentLang() {
  const fromRoute = m.route.param('lang')
  if (fromRoute === 'en' || fromRoute === 'es') return fromRoute
  try {
    const stored = localStorage.getItem('pum-lang')
    if (stored === 'en' || stored === 'es') return stored
  } catch (e) { /* storage blocked */ }
  return 'en'
}

/** Change language: persist and update the URL query param. */
export function setLang(lang) {
  const l = lang === 'es' ? 'es' : 'en'
  try { localStorage.setItem('pum-lang', l) } catch (e) { /* storage blocked */ }
  m.route.set(m.route.get(), {}, { ...m.route.param(), lang: l })
  m.redraw()
}

/**
 * Load per-page i18n translations. Called from a page's oninit.
 * Example: loadPageI18n('button') loads playground/pages/button/i18n/{en,es}.yml
 * Returns a promise that resolves when both languages are loaded.
 */
export function loadPageI18n(pageName) {
  if (_currentPage === pageName) return
  _currentPage = pageName
  if (pageI18n.en[pageName]) {
    pages.en = pageI18n.en[pageName]
    pages.es = pageI18n.es[pageName]
    m.redraw()
  } else {
    pages.en = {}
    pages.es = {}
    // Pages without i18n — no warning needed, many are structural (componentpage, etc.)
  }
}

/** Look up a dotted key: checks page translations first, then shared, then English fallback. */
export function t(path) {
  const lang = currentLang()
  // Page translations first
  let val = resolve(pages[lang], path)
  if (val !== undefined) return val
  // Shared translations
  val = resolve(shared[lang], path)
  if (val !== undefined) return val
  // English fallback
  const enVal = resolve(pages.en, path) ?? resolve(shared.en, path)
  return enVal !== undefined ? enVal : path
}

/** Direct lookup for classRow descriptions (keys may contain dots/colons that break dotted paths). */
export function tClassRow(description) {
  const lang = currentLang()
  const section = shared[lang].classRowDescs || {}
  const val = section[description]
  if (val !== undefined) return val
  const enSection = shared.en.classRowDescs || {}
  const enVal = enSection[description]
  return enVal !== undefined ? enVal : description
}

export default { t, currentLang, setLang, tClassRow, loadPageI18n }
