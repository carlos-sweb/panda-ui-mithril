import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const cardStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    rounded: 'box',
    overflow: 'hidden',
    bg: 'base-100',
  },
  variants: {
    size: {
      xs: { p: '2' },
      sm: { p: '4' },
      md: { p: '6' },
      lg: { p: '8' },
      xl: { p: '10' },
    },
    border: {
      true: { borderWidth: '1px', borderColor: 'base-300' },
    },
    dash: {
      true: { borderWidth: '1px', borderColor: 'base-300', borderStyle: 'dashed' },
    },
    side: {
      true: { flexDirection: 'row' },
    },
    imageFull: {
      true: { '& img': { objectFit: 'cover', w: 'full', h: 'full' } },
    },
  },
})

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
