import m from 'mithril'
import { collapseStyles, collapseTitleStyles } from '../../recipes/accordion'
import { cx } from '../../utils/cx'


export const Accordion = {
  view(vnode) {
    const { arrow, plus, border, name, checked, defaultChecked, className, onchange, ...rest } = vnode.attrs

    return m('div', {
      className: cx('collapse', arrow && 'collapse-arrow', plus && 'collapse-plus', collapseStyles({ arrow, plus, border }), className),
      ...rest
    }, [
      m('input', {
        type: name ? 'radio' : 'checkbox',
        name,
        checked,
        onchange,
        oncreate: defaultChecked ? (el) => { el.dom.checked = true } : undefined,
      }),
      vnode.children,
    ])
  }
}

export const AccordionTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('collapse-title', collapseTitleStyles(), className), ...rest }, vnode.children)
  }
}

export const AccordionContent = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('collapse-content', className), ...rest }, vnode.children)
  }
}

export const Collapse = Accordion
export const CollapseTitle = AccordionTitle
export const CollapseContent = AccordionContent
