import m from 'mithril'
import { swapRecipe } from '../../recipes/swap'
import { cx } from '../../utils/cx'

/**
 * Swap — toggle on/off que intercambia dos contenidos (patrón inspirado en daisyUI).
 *
 * Renderiza un `<label>` que envuelve un `<input type="checkbox">` oculto más
 * los bloques `.swap-on` / `.swap-off`. El toggle es 100% CSS: hacer click en
 * el label alterna el checkbox nativo y el recipe (`cva()`, single-slot, sin
 * `defaultStyles`) conmuta opacidad/transformación vía
 * `input:checked ~ .swap-on|.swap-off` + `transition` — sin estado JS.
 *
 * - `active` añade la clase `swap-active` (toggle programático/incontrolado,
 *   sin necesidad de interactuar con el checkbox).
 * - `checked` + `onchange` permiten uso controlado (se propagan al input).
 * - `style="flip"` usa rotateY con `backfaceVisibility`; `style="rotate"`
 *   (default) rota 45deg el contenido activo.
 *
 * @param {object} vnode - Mithril vnode
 * @param {boolean} [vnode.attrs.active] - Aplica la clase `swap-active` para
 *   mostrar `.swap-on` sin depender del estado del checkbox.
 * @param {'rotate'|'flip'} [vnode.attrs.style] - Estilo de la transición:
 *   `rotate` (default) o `flip` 3D.
 * @param {import('mithril').Children} [vnode.attrs.on] - Contenido visible
 *   cuando el swap está activo (`swap-on`).
 * @param {import('mithril').Children} [vnode.attrs.off] - Contenido visible
 *   cuando el swap está inactivo (`swap-off`).
 * @param {boolean} [vnode.attrs.checked] - Estado controlado del checkbox.
 * @param {(e: Event) => void} [vnode.attrs.onchange] - Handler de cambio del
 *   checkbox (uso controlado).
 * @param {string} [vnode.attrs.className] - Clase(s) extra añadida(s) tras la
 *   clase base `swap` y el output del recipe.
 * @param {object} [vnode.attrs] - Cualquier otro atributo se propaga al label.
 * @param {import('mithril').Children} [vnode.children] - Contenido adicional
 *   tras los bloques on/off.
 * @returns {import('mithril').Vnode} Un elemento `label.swap`.
 * @type {import('mithril').Component<import('./index').SwapAttrs>}
 */
export const Swap = {    
  view(vnode) {
    const { active, style, size, className, on, off, checked, onchange, ...rest } = vnode.attrs
    return m('label', {
      className: cx('swap', swapRecipe({ style, size }), active && 'swap-active', className),
      ...rest
    }, [
      m('input', { type: 'checkbox', checked, onchange }),
      on && m('div', { className: 'swap-on' }, on),
      off && m('div', { className: 'swap-off' }, off),
      vnode.children,
    ])
  }
}
