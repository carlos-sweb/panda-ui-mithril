export type PumLocale = 'en' | 'es'

/**
 * Sets the library language ('en' default, 'es') and persists it in
 * localStorage under the key `pum-lang` (restored on load).
 * Call `m.redraw()` after.
 */
export function setLocale(locale: PumLocale): void
/** Returns the active library language (persisted in `pum-lang`). */
export function getLocale(): PumLocale
