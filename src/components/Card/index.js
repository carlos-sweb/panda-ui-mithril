import m from 'mithril'
import { card } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente Card. Contenedor de contenido con variantes de tamaño, borde
 * (`border`/`dash`), disposición lateral (`side`) e imagen a pantalla
 * completa (`imageFull`).
 *
 * @type {import('mithril').Component<import('./index').CardAttrs>}
 */
export const Card = {
  view(vnode) {
    const { size, border, dash, side, imageFull, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'card',
        border && 'card-border',
        dash && 'card-dash',
        side && 'card-side',
        imageFull && 'image-full',
        card({ size, border, dash, side, imageFull }).card,
        className
      ),
      ...rest
    }, vnode.children)
  }
}

/**
 * Resultado cacheado de `card({})` — los subcomponentes no pasan variantes
 * (excepto CardActions con `justify`), así que sus clases son determinísticas.
 * Evita llamar al sva en cada render.
 * @type {ReturnType<typeof card>}
 */
const defaultStyles = card({})

/**
 * Cuerpo de la card: apila el contenido con padding y gap.
 *
 * @type {import('mithril').Component<import('./index').CardBodyAttrs>}
 */
export const CardBody = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('card-body', defaultStyles.body, className), ...rest }, vnode.children)
  }
}

/**
 * Título de la card.
 *
 * @type {import('mithril').Component<import('./index').CardTitleAttrs>}
 */
export const CardTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('h2', { className: cx('card-title', defaultStyles.title, className), ...rest }, vnode.children)
  }
}

/**
 * Zona de acciones de la card; `justify` controla su alineación
 * (start, center, end, between).
 *
 * @type {import('mithril').Component<import('./index').CardActionsAttrs>}
 */
export const CardActions = {
  view(vnode) {
    const { justify, className, ...rest } = vnode.attrs
    return m('div', {
      className: cx('card-actions', card({ justify }).actions, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Imagen destacada de la card (usa `<figure>`).
 *
 * @type {import('mithril').Component<import('./index').CardFigureAttrs>}
 */
export const CardFigure = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('figure', { className, ...rest }, vnode.children)
  }
}
