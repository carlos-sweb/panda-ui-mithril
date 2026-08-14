import m from 'mithril'
import { steps } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'

/**
 * Componente Steps. Progreso por pasos, horizontal o vertical.
 *
 * @type {import('mithril').Component<import('./index').StepsAttrs>}
 */
export const Steps = {
  view(vnode) {
    const { horizontal, vertical, className, ...rest } = vnode.attrs
    const direction = vertical && !horizontal ? 'vertical' : 'horizontal'

    return m('ul', {
      className: cx('steps', steps({ direction }).steps, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Paso individual; `color` cambia el color de su marcador.
 *
 * @type {import('mithril').Component<import('./index').StepAttrs>}
 */
export const Step = {
  view(vnode) {
    const { color, className, ...rest } = vnode.attrs

    return m('li', {
      className: cx('step', color && `step-${color}`, steps({ color }).step, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Icono opcional dentro de un paso (reemplaza el número por defecto).
 *
 * @type {import('mithril').Component<import('./index').StepIconAttrs>}
 */
export const StepIcon = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('span', { className: cx('step-icon', className), ...rest }, vnode.children)
  }
}
