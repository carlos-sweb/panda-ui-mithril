import m from 'mithril'
import { collapseRecipe, collapseTitleRecipe } from '../../recipes/accordion'
import { cx } from '../../utils/cx'

/**
 * Componente Accordion. Panel colapsable accionado por un `<input>` oculto
 * (checkbox, o radio si se pasa `name` para agrupar). Variantes `arrow`,
 * `plus` y `border`. Alias: Collapse.
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
        collapseRecipe({ arrow, plus, border }), className),
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
 * Componente AccordionTitle. Cabecera clicable del panel (`collapse-title`).
 *
 * @type {import('mithril').Component<import('./index').AccordionTitleAttrs>}
 */
export const AccordionTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('collapse-title', collapseTitleRecipe(), className), ...rest }, vnode.children)
  }
}

/**
 * Componente AccordionContent. Cuerpo del panel (`collapse-content`); se
 * muestra/oculta según el estado del `<input>`.
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
 * Alias de Accordion.
 * @type {import('mithril').Component<import('./index').AccordionAttrs>}
 */
export const Collapse = Accordion

/**
 * Alias de AccordionTitle.
 * @type {import('mithril').Component<import('./index').AccordionTitleAttrs>}
 */
export const CollapseTitle = AccordionTitle

/**
 * Alias de AccordionContent.
 * @type {import('mithril').Component<import('./index').AccordionContentAttrs>}
 */
export const CollapseContent = AccordionContent
