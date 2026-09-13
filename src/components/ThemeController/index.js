import m from 'mithril'
import { toggle } from '../../../styled-system/recipes'
import { checkbox } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

// The original implementation's `theme-controller` class carries NO CSS of its own — theming
// works via a build-time plugin that generates a `:root:has(input.theme-
// controller[value="X"]:checked)` rule per theme, and the checkbox is always
// combined with .toggle/.checkbox/.swap for its actual look. This project
// doesn't run that plugin (themes are switched by setting `data-theme` on
// <html> directly, see playground/main.jsx), so the CSS-only mechanism
// wouldn't do anything here even if replicated. Since this library wraps
// Mithril specifically to use real JS (see memory: js-over-css-purity),
// ThemeController stays a controlled input like Checkbox/Toggle/Radio — the
// consumer's onchange sets data-theme, same pattern already used in
// playground/main.jsx's own navbar theme button.

/**
 * ThemeController component. Controlled checkbox to toggle the application's
 * theme. `theme` is the name of the theme it activates (e.g. "dark"),
 * `checked` its state and `onchange` receives the selected theme (or undefined
 * when deselecting it). `variant` chooses whether it looks like a toggle or a checkbox.
 *
 * @type {import('mithril').Component<import('./index').ThemeControllerAttrs>}
 */
export const ThemeController = {
  view(vnode) {
    const { variant = 'toggle', size, color, theme, checked, className, onchange, ...rest } = vnode.attrs
    const styles = variant === 'checkbox' ? checkbox({ size, color }) : toggle({ size, color })

    return m('input', {
      type: 'checkbox',
      className: cx('theme-controller', variant, styles, className),
      value: theme,
      checked,
      onchange: (e) => onchange && onchange(e.target.checked ? theme : undefined),
      ...rest
    })
  }
}
