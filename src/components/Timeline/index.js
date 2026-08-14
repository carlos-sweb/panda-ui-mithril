import m from 'mithril'
import { timeline } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'

/**
 * Componente Timeline. Línea de tiempo, horizontal o vertical, con
 * `snapIcon` para compactar el marcador central.
 *
 * @type {import('mithril').Component<import('./index').TimelineAttrs>}
 */
export const Timeline = {
  view(vnode) {
    const { horizontal, vertical, snapIcon, className, ...rest } = vnode.attrs
    const direction = vertical && !horizontal ? 'vertical' : 'horizontal'

    return m('ul', {
      className: cx('timeline', timeline({ direction, snapIcon }).timeline, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Resultado cacheado de `timeline({})` — los subcomponentes no pasan variantes
 * (solo `box` activa la clase del slot `box`), así que sus clases son
 * determinísticas. Evita llamar al sva en cada render.
 * @type {ReturnType<typeof timeline>}
 */
const defaultStyles = timeline({})

/**
 * Elemento de la timeline; `hrBefore`/`hrAfter` añaden conectores.
 *
 * @type {import('mithril').Component<import('./index').TimelineItemAttrs>}
 */
export const TimelineItem = {
  view(vnode) {
    const { hrBefore, hrAfter, className, ...rest } = vnode.attrs
    return m('li', { className, ...rest }, [
      hrBefore && m('hr'),
      vnode.children,
      hrAfter && m('hr'),
    ])
  }
}

/**
 * Contenido inicial del elemento; `box` lo renderiza como un callout con borde.
 *
 * @type {import('mithril').Component<import('./index').TimelineStartAttrs>}
 */
export const TimelineStart = {
  view(vnode) {
    const { box, className, ...rest } = vnode.attrs
    return m('div', { className: cx('timeline-start', box && defaultStyles.box, box && 'timeline-box', className), ...rest }, vnode.children)
  }
}

/**
 * Marcador central de la timeline.
 *
 * @type {import('mithril').Component<import('./index').TimelineMiddleAttrs>}
 */
export const TimelineMiddle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('timeline-middle', className), ...rest }, vnode.children)
  }
}

/**
 * Contenido final del elemento; `box` lo renderiza como un callout con borde.
 *
 * @type {import('mithril').Component<import('./index').TimelineEndAttrs>}
 */
export const TimelineEnd = {
  view(vnode) {
    const { box, className, ...rest } = vnode.attrs
    return m('div', { className: cx('timeline-end', box && defaultStyles.box, box && 'timeline-box', className), ...rest }, vnode.children)
  }
}
