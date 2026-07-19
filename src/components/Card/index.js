import m from 'mithril'
import { cardStyles } from '../../recipes/card'
import { cx } from '../../utils/cx'


export const Card = {
  view(vnode) {
    const { size, border, dash, side, imageFull, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('card', cardStyles({ size, border, dash, side, imageFull }), className),
      ...rest
    }, children)
  }
}

export const CardBody = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('card-body', className), ...rest }, children)
  }
}

export const CardTitle = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('h2', { className: cx('card-title', className), ...rest }, children)
  }
}

export const CardActions = {
  view(vnode) {
    const { justify, className, children, ...rest } = vnode.attrs
    return m('div', {
      className: cx('card-actions', justify && `justify-${justify}`, className),
      ...rest
    }, children)
  }
}

export const CardFigure = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('figure', { className, ...rest }, children)
  }
}
