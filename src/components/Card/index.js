import m from 'mithril'
import { card } from '../../recipes/card'
import { cx } from '../../utils/cx'


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

export const CardBody = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('card-body', card({}).body, className), ...rest }, vnode.children)
  }
}

export const CardTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('h2', { className: cx('card-title', card({}).title, className), ...rest }, vnode.children)
  }
}

export const CardActions = {
  view(vnode) {
    const { justify, className, ...rest } = vnode.attrs
    return m('div', {
      className: cx('card-actions', card({ justify }).actions, className),
      ...rest
    }, vnode.children)
  }
}

export const CardFigure = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('figure', { className, ...rest }, vnode.children)
  }
}
