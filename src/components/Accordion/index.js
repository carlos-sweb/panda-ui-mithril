import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const collapseStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  variants: {
    arrow: { true: {} },
    plus: { true: {} },
    open: { true: { _open: { maxHeight: '9999px' } } },
    close: { true: {} },
  },
})

export const Accordion = {
  view(vnode) {
    const { arrow, plus, open, close, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('collapse', collapseStyles({ arrow, plus, open, close }), className),
      ...rest
    }, children)
  }
}

export const AccordionTitle = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('collapse-title', className), ...rest }, children)
  }
}

export const AccordionContent = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('collapse-content', className), ...rest }, children)
  }
}

export const Collapse = Accordion
export const CollapseTitle = AccordionTitle
export const CollapseContent = AccordionContent
