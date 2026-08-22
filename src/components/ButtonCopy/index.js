import m from 'mithril'
import { Copy, Check } from 'lucide-mithril'
import { Button } from '../Button/index.jsx'
import { Tooltip } from '../Tooltip/index.js'
import { cx } from '../../../styled-system/css'

const iconSizes = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 }

/**
 * CSS animation applied to the icon wrapper span when the icon swaps.
 * Each key maps to a @keyframes name defined in the preset.
 * 'none' skips the animation entirely.
 */
const animationMap = {
  fade:   'btn-copy-fade   0.2s ease both',
  scale:  'btn-copy-scale  0.2s ease both',
  rotate: 'btn-copy-rotate 0.25s ease both',
  bounce: 'btn-copy-bounce 0.35s ease both',
  none:   undefined,
}

/** Resolve the user-supplied text to copy.
 *  - `text` prop → use as-is
 *  - `for` prop  → read textContent of document.getElementById(for)
 *  - fallback    → empty string
 */
function resolveText(attrs) {
  if (attrs.text != null) return String(attrs.text)
  if (attrs.for) {
    const el = document.getElementById(attrs.for)
    return el ? el.textContent || '' : ''
  }
  return ''
}

/**
 * ButtonCopy — copies text to the clipboard.
 *
 * Icon transition:
 *   The Copy icon swaps to Check on success. The `animation` prop controls
 *   how the incoming icon enters. Default is 'scale'. Set 'none' to disable.
 *   Each icon gets a unique `key` so Mithril always creates a fresh DOM node
 *   for the incoming icon, guaranteeing the CSS animation fires from scratch.
 *
 * Tooltip behavior:
 *   - `tooltip` not provided → no Tooltip is rendered, just the bare Button.
 *   - `tooltip` provided     → wraps Button in Tooltip, shows the label after copy.
 *
 * Props:
 *   text       — string to copy (preferred)
 *   for        — id of a DOM element whose textContent is copied
 *   tooltip    — feedback label shown after copying (e.g. "Copied!").
 *                When omitted the Tooltip is not rendered.
 *   animation  — icon transition: 'fade' | 'scale' | 'rotate' | 'bounce' | 'none'
 *                Default: 'scale'
 *   duration   — ms the copied state persists (default 2000)
 *   size       — Button size (xs | sm | md | lg | xl)
 *   color      — Button color
 *   variant    — Button variant
 *   ...rest    — forwarded to Button
 *
 * @type {import('mithril').ClassComponent<import('./index').ButtonCopyAttrs>}
 */
export const ButtonCopy = {
  /** @param {import('mithril').Vnode} vnode */
  oninit(vnode) {
    vnode.state.copied = false
    vnode.state._timer = null
  },

  onremove(vnode) {
    if (vnode.state._timer) clearTimeout(vnode.state._timer)
  },

  view(vnode) {
    const {
      text,
      for: forId,
      tooltip: tooltipLabel,
      animation = 'scale',
      duration = 2000,
      size,
      shape,
      className,
      ...rest
    } = vnode.attrs

    const { copied } = vnode.state
    const iconSize = iconSizes[size] || 16
    const hasTooltip = tooltipLabel != null
    const animStyle = animationMap[animation] ?? animationMap.scale

    const handleClick = (e) => {
      if (typeof rest.onclick === 'function') rest.onclick(e)

      const textToCopy = resolveText({ text, for: forId })
      if (!textToCopy) return

      navigator.clipboard.writeText(textToCopy).then(() => {
        vnode.state.copied = true
        m.redraw()

        if (vnode.state._timer) clearTimeout(vnode.state._timer)
        vnode.state._timer = setTimeout(() => {
          vnode.state.copied = false
          m.redraw()
        }, duration)
      }).catch(() => {
        // clipboard write failed silently — no-op
      })
    }

    // Each state gets a different key so Mithril always creates a new span
    // node when the icon changes, which re-triggers the CSS animation.
    const iconNode = copied
      ? m('span', { key: 'check', style: animStyle ? { animation: animStyle } : undefined },
          m(Check, { size: iconSize, 'stroke-width': 2 }))
      : m('span', { key: 'copy', style: animStyle ? { animation: animStyle } : undefined },
          m(Copy, { size: iconSize, 'stroke-width': 2 }))

    const button = m(Button, {
      // ButtonCopy is a wrapper of Button with the SVG already set — like
      // ButtonClose, it defaults to a circular (round) button. Pass
      // `shape="square"` (or an explicit `circle`/`square` prop) to override.
      circle: shape !== 'square',
      square: shape === 'square',
      size,
      className: cx('btn-copy', className),
      onclick: handleClick,
      'aria-label': 'Copy to clipboard',
      ...rest,
    }, iconNode)

    if (!hasTooltip) return button

    return m(Tooltip, {
      tip: tooltipLabel,
      open: copied,
      position: 'top',
    }, button)
  }
}
