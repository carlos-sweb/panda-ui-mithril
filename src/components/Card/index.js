import m from 'mithril'
import { cardStyles, cardBodyStyles, cardTitleStyles, cardActionsStyles } from '../../recipes/card'
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
        cardStyles({ size, border, dash, side, imageFull }),
        className
      ),
      ...rest
    }, vnode.children)
  }
}

export const CardBody = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('card-body', cardBodyStyles(), className), ...rest }, vnode.children)
  }
}

export const CardTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('h2', { className: cx('card-title', cardTitleStyles(), className), ...rest }, vnode.children)
  }
}

export const CardActions = {
  view(vnode) {
    const { justify, className, ...rest } = vnode.attrs
    return m('div', {
      className: cx('card-actions', cardActionsStyles({ justify }), className),
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
