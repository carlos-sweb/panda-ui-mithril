import m from 'mithril'
import { diffStyles, diffItemStyles, diffResizerStyles } from '../../recipes/diff'
import { cx } from '../../utils/cx'

// Real daisyUI drives this with a `<div class="diff-resizer">` that uses the
// native CSS `resize` property (a tiny corner-drag handle) combined with
// container-query units — clever, but the resulting UX is a fiddly corner
// nub rather than a draggable handle you can grab anywhere on the bar. This
// project has real JS via Mithril, so the divider position is tracked as
// component state and updated on pointer drag instead — same visual result
// (an image comparison slider), a more usual drag-anywhere interaction.
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
      className: cx('diff', diffStyles(), className),
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

export const DiffItem1 = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('diff-item-1', diffItemStyles({ item: 1 }), className), ...rest }, vnode.children)
  }
}

export const DiffItem2 = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('diff-item-2', diffItemStyles({ item: 2 }), className), ...rest }, vnode.children)
  }
}

export const DiffResizer = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('diff-resizer', diffResizerStyles(), className), ...rest })
  }
}
