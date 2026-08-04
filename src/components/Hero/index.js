import m from 'mithril'
import { hero } from '../../recipes/hero'
import { cx } from '../../utils/cx'

/**
 * Componente Hero. Sección hero de ancho completo; los hijos HeroOverlay y
 * HeroContent se superponen sobre el fondo en el mismo grid.
 *
 * @type {import('mithril').Component<import('./index').HeroAttrs>}
 */
export const Hero = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('hero', defaultStyles.hero, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Resultado cacheado de `hero({})` — los subcomponentes no pasan variantes,
 * así que las clases son determinísticas. Evita llamar al sva en cada render.
 * @type {ReturnType<typeof hero>}
 */
const defaultStyles = hero({})

/**
 * Componente HeroContent. Contenido del hero, aislado por encima del overlay
 * (slot `content` de la recipe).
 *
 * @type {import('mithril').Component<import('./index').HeroContentAttrs>}
 */
export const HeroContent = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('hero-content', defaultStyles.content, className), ...rest }, vnode.children)
  }
}

/**
 * Componente HeroOverlay. Capa oscura sobre el fondo del hero (slot `overlay`
 * de la recipe).
 *
 * @type {import('mithril').Component<import('./index').HeroOverlayAttrs>}
 */
export const HeroOverlay = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('hero-overlay', defaultStyles.overlay, className), ...rest }, vnode.children)
  }
}
