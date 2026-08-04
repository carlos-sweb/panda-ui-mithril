import m from 'mithril'
import { diff } from '../../recipes/diff'
import { cx } from '../../utils/cx'

// The original implementation drives this with a `<div class="diff-resizer">` that uses the
// native CSS `resize` property (a tiny corner-drag handle) combined with
// container-query units — clever, but the resulting UX is a fiddly corner
// nub rather than a draggable handle you can grab anywhere on the bar. This
// project has real JS via Mithril, so the divider position is tracked as
// component state and updated on pointer drag instead — same visual result
// (an image comparison slider), a more usual drag-anywhere interaction.

/**
 * Resultado cacheado de `diff({})` — los subcomponentes sin variantes reusan
 * las mismas clases en cada render. Evita llamar al sva repetidamente.
 * @type {ReturnType<typeof diff>}
 */
const defaultStyles = diff({})

/**
 * Componente Diff. Comparador de imágenes antes/después con divisor
 * arrastrable. `defaultPosition` fija el punto de partida del divisor en
 * porcentaje (0-100, por defecto 50); la posición se actualiza al arrastrar.
 *
 * @type {import('mithril').Component<import('./index').DiffAttrs>}
 */
export const Diff = {
  oninit(vnode) {
    vnode.state.position = vnode.attrs.defaultPosition ?? 50
    vnode.state.dragging = false
  },

  view(vnode) {
    const { className, defaultPosition, ...rest } = vnode.attrs
    const state = vnode.state

    const setFromPointer = (e) => {
      if (!state.el) return
      const rect = state.el.getBoundingClientRect()
      const pct = ((e.clientX - rect.left) / rect.width) * 100
      state.position = Math.min(100, Math.max(0, pct))
    }

    return m('figure', {
      className: cx('diff', defaultStyles.diff, className),
      style: `--diff-pos: ${state.position}%`,
      oncreate: (vn) => { state.el = vn.dom },
      onpointerdown: (e) => {
        state.dragging = true
        e.currentTarget.setPointerCapture?.(e.pointerId)
        setFromPointer(e)
      },
      onpointermove: (e) => { if (state.dragging) setFromPointer(e) },
      onpointerup: () => { state.dragging = false },
      onpointercancel: () => { state.dragging = false },
      ...rest
    }, vnode.children)
  }
}

/**
 * Componente DiffItem1. Imagen "antes" (izquierda), recortada según la
 * posición actual del divisor.
 *
 * @type {import('mithril').Component<import('./index').DiffItem1Attrs>}
 */
export const DiffItem1 = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('diff-item-1', diff({ item: 1 }).item, className), ...rest }, vnode.children)
  }
}

/**
 * Componente DiffItem2. Imagen "después" (derecha), visible bajo la capa
 * recortada de DiffItem1.
 *
 * @type {import('mithril').Component<import('./index').DiffItem2Attrs>}
 */
export const DiffItem2 = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('diff-item-2', diff({ item: 2 }).item, className), ...rest }, vnode.children)
  }
}

/**
 * Componente DiffResizer. Divisor vertical entre las dos imágenes; se
 * posiciona con `--diff-pos` y muestra el tirador central.
 *
 * @type {import('mithril').Component<import('./index').DiffResizerAttrs>}
 */
export const DiffResizer = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('diff-resizer', defaultStyles.resizer, className), ...rest })
  }
}
