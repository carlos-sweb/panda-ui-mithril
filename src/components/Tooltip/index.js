import m from 'mithril'
import { tooltipStyles } from '../../recipes/tooltip'
import { cx } from '../../utils/cx'

/**
 * Tooltip. Muestra información adicional (`tip`) al hacer hover, al recibir
 * focus-visible o de forma imperativa vía `open`.
 *
 * - La burbuja y la cola son pseudo-elementos (`:before`/`:after`) que están
 *   siempre en el DOM con `opacity: 0`; el recipe los anima a `opacity: 1`
 *   con `transition` (ver `recipes/tooltip.ts`).
 * - Hover y focus-visible ya son 100% CSS (selectores `:hover` y
 *   `:has(:focus-visible)` en el recipe). El prop `open` cubre el estado
 *   controlado por el consumidor (cualquier condición que no sea hover/focus,
 *   ej. click, timer, máquina de estados) añadiendo la clase `tooltip-open`.
 * - No es migrable a `@starting-style` + `transition`: los pseudo-elementos
 *   nunca pasan por `display: none` (siempre existen a `opacity: 0`), así que
 *   `@starting-style` jamás se dispara; y tampoco puede expresar estado
 *   arbitrario de JS, solo inserción/cambios de display. La clase imperativa
 *   `tooltip-open` se mantiene.
 *
 * @type {import('mithril').Component<import('./index').TooltipAttrs>}
 */
export const Tooltip = {
  /** @param {Object} vnode @returns {import('mithril').Vnode} */
  view(vnode) {
    const { tip, position, color, open, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'tooltip',
        tooltipStyles({ position, color }),
        open && 'tooltip-open',
        className
      ),
      'data-tip': tip,
      ...rest
    }, vnode.children)
  }
}
