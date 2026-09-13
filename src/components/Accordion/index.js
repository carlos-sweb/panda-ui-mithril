import m from 'mithril'
import { collapse, collapseTitle } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Accordion component. Collapsible panel driven by a hidden `<input>`
 * (checkbox, or radio if `name` is passed to group them). Variants `arrow`,
 * `plus` and `border`. Alias: Collapse.
 *
 * @type {import('mithril').Component<import('./index').AccordionAttrs>}
 */
export const Accordion = {  
  view(vnode) {
    const { 
      arrow, 
      plus, 
      border, 
      name, 
      checked, 
      defaultChecked, 
      className, 
      onchange, 
      ...rest } = vnode.attrs
      
    return m('div', {
      className: cx(
        'collapse', 
        arrow && 'collapse-arrow',
        plus && 'collapse-plus', 
        collapse({ arrow, plus, border }), className),
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

/**
 * AccordionTitle component. Clickable panel header (`collapse-title`).
 *
 * @type {import('mithril').Component<import('./index').AccordionTitleAttrs>}
 */
export const AccordionTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('collapse-title', collapseTitle(), className), ...rest }, vnode.children)
  }
}

/**
 * AccordionContent component. Panel body (`collapse-content`); it is
 * shown/hidden according to the `<input>` state.
 *
 * @type {import('mithril').Component<import('./index').AccordionContentAttrs>}
 */
export const AccordionContent = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('collapse-content', className), ...rest }, vnode.children)
  }
}

/**
 * Alias of Accordion.
 * @type {import('mithril').Component<import('./index').AccordionAttrs>}
 */
export const Collapse = Accordion

/**
 * Alias of AccordionTitle.
 * @type {import('mithril').Component<import('./index').AccordionTitleAttrs>}
 */
export const CollapseTitle = AccordionTitle

/**
 * Alias of AccordionContent.
 * @type {import('mithril').Component<import('./index').AccordionContentAttrs>}
 */
export const CollapseContent = AccordionContent
