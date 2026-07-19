import m from 'mithril'
import { collapseStyles } from '../../recipes/accordion'
import { cx } from '../../utils/cx'


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
