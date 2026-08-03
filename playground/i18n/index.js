import m from 'mithril'
import enModule from './en.yml'
import esModule from './es.yml'

const translations = { en: enModule, es: esModule }

/** Resolve a dotted path ('sidebar.categories.layout') from an object. Returns the value or the key itself on miss. */
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

/** Look up a dotted key in the active language bundle. Falls back to English on miss. */
export function t(path) {
  const lang = currentLang()
  const bundle = translations[lang]
  const val = resolve(bundle, path)
  if (val !== undefined) return val
  // explicit fallback to English
  const enVal = resolve(translations.en, path)
  return enVal !== undefined ? enVal : path
}

export default { t, currentLang, setLang }
