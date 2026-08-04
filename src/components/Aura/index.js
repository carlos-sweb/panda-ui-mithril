import m from 'mithril'
import { auraStyles } from '../../recipes/aura'
import { cx } from '../../utils/cx'

/**
 * Aura — a decorative animated glow/border wrapper component.
 *
 * Renders a `div` with a rotating conic-gradient aura animated via the
 * `--aura-angle` custom property (see the `aura` keyframes). The recipe
 * (`cva()`, no defaultStyles) drives all visuals through className only;
 * the rotating angle is controlled purely by the keyframe animation.
 *
 * @param {object} vnode - Mithril vnode
 * @param {import('../../types').PumSize} [vnode.attrs.size='md'] - Padding thickness:
 *   `xs` (0), `sm` (1px), `md` (2px), `lg` (2.5px), `xl` (4px).
 * @param {'default'|'rainbow'|'holo'|'dual'|'silver'|'gold'|'glow'} [vnode.attrs.variant='default'] -
 *   Aura style: `default` (currentColor ring), `rainbow`, `holo`, `dual`,
 *   `silver`, `gold`, or static `glow` (radial, no rotation).
 * @param {'box'|'field'|'selector'} [vnode.attrs.shape] - Corner radius token used
 *   by the aura (`--aura-radius`); falls back to `--radius-box` when omitted.
 * @param {string} [vnode.attrs.className] - Extra CSS class(es) appended to the
 *   base `aura` class and recipe output.
 * @param {object} [vnode.attrs] - Any other attributes are spread onto the `div`.
 * @param {import('mithril').Children} [vnode.children] - Content wrapped by the
 *   aura (e.g. a Button). Rendered with `z-index: 1` above the aura layers.
 * @returns {import('mithril').Vnode} A `div.aura` element.
 */
export const Aura = {
  view(vnode) {
    const { variant, shape, size, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('aura', variant && variant !== 'default' && `aura-${variant}`, auraStyles({ variant, shape, size }), className),
      ...rest
    }, vnode.children)
  }
}
