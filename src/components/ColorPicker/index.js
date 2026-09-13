import m from 'mithril'
import { Copy, Check, ChevronDown } from 'lucide-mithril'
import { colorPicker } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { t } from '../../i18n'
import { Dropdown, DropdownTrigger, DropdownContent } from '../Dropdown/index.js'
import { Menu, MenuItem } from '../Menu/index.js'
import { Button } from '../Button/index.js'
import { ButtonClose } from '../ButtonClose/index.js'
import {
  clamp, hexToRgb, rgbToHex, rgbToHsb, hsbToRgb, rgbToHsl, hslToRgb,
  rgbToCmyk, cmykToRgb, rgbToLab, labToRgb,
} from './convert.js'

const defaultStyles = colorPicker({})

// Modes: conversion keys + channel definitions (i18n label, min, max,
// gradient track and value formatting).
const MODES = {
  picker: { label: () => t('colorpicker.modePicker') },
  hsb: {
    label: () => 'HSB',
    channels: [
      { key: 'h', i18n: 'colorpicker.channel.hue', min: 0, max: 360, fmt: (v) => `${Math.round(v)}°`, track: (c) => `linear-gradient(to right, hsl(0 100% 50%), hsl(60 100% 50%), hsl(120 100% 50%), hsl(180 100% 50%), hsl(240 100% 50%), hsl(300 100% 50%), hsl(360 100% 50%))` },
      { key: 's', i18n: 'colorpicker.channel.saturation', min: 0, max: 100, fmt: (v) => `${Math.round(v)}%`, track: (c) => `linear-gradient(to right, hsl(${c.h} 0% ${c.b}%), hsl(${c.h} 100% ${c.b}%))` },
      { key: 'b', i18n: 'colorpicker.channel.brightness', min: 0, max: 100, fmt: (v) => `${Math.round(v)}%`, track: (c) => `linear-gradient(to right, black, hsl(${c.h} ${c.s}% 100%))` },
    ],
    fromHex: (rgb) => rgbToHsb(rgb),
    toHex: (c) => rgbToHex(hsbToRgb(c)),
  },
  hsl: {
    label: () => 'HSL',
    channels: [
      { key: 'h', i18n: 'colorpicker.channel.hue', min: 0, max: 360, fmt: (v) => `${Math.round(v)}°`, track: () => `linear-gradient(to right, hsl(0 100% 50%), hsl(60 100% 50%), hsl(120 100% 50%), hsl(180 100% 50%), hsl(240 100% 50%), hsl(300 100% 50%), hsl(360 100% 50%))` },
      { key: 's', i18n: 'colorpicker.channel.saturation', min: 0, max: 100, fmt: (v) => `${Math.round(v)}%`, track: (c) => `linear-gradient(to right, hsl(${c.h} 0% ${c.l}%), hsl(${c.h} 100% ${c.l}%))` },
      { key: 'l', i18n: 'colorpicker.channel.lightness', min: 0, max: 100, fmt: (v) => `${Math.round(v)}%`, track: (c) => `linear-gradient(to right, black, hsl(${c.h} ${c.s}% 50%), white)` },
    ],
    fromHex: (rgb) => rgbToHsl(rgb),
    toHex: (c) => rgbToHex(hslToRgb(c)),
  },
  rgb: {
    label: () => 'RGB',
    channels: [
      { key: 'r', i18n: 'colorpicker.channel.red', min: 0, max: 255, fmt: (v) => `${Math.round(v)}`, track: (c) => `linear-gradient(to right, rgb(0 ${c.g} ${c.b}), rgb(255 ${c.g} ${c.b}))` },
      { key: 'g', i18n: 'colorpicker.channel.green', min: 0, max: 255, fmt: (v) => `${Math.round(v)}`, track: (c) => `linear-gradient(to right, rgb(${c.r} 0 ${c.b}), rgb(${c.r} 255 ${c.b}))` },
      { key: 'b', i18n: 'colorpicker.channel.blue', min: 0, max: 255, fmt: (v) => `${Math.round(v)}`, track: (c) => `linear-gradient(to right, rgb(${c.r} ${c.g} 0), rgb(${c.r} ${c.g} 255))` },
    ],
    fromHex: (rgb) => ({ ...rgb }),
    toHex: (c) => rgbToHex({ r: c.r, g: c.g, b: c.b }),
  },
  cmyk: {
    label: () => 'CMYK',
    channels: [
      { key: 'c', i18n: 'colorpicker.channel.cyan', min: 0, max: 100, fmt: (v) => `${Math.round(v)}%`, track: () => `linear-gradient(to right, white, #00ffff)` },
      { key: 'm', i18n: 'colorpicker.channel.magenta', min: 0, max: 100, fmt: (v) => `${Math.round(v)}%`, track: () => `linear-gradient(to right, white, #ff00ff)` },
      { key: 'y', i18n: 'colorpicker.channel.yellow', min: 0, max: 100, fmt: (v) => `${Math.round(v)}%`, track: () => `linear-gradient(to right, white, #ffff00)` },
      { key: 'k', i18n: 'colorpicker.channel.key', min: 0, max: 100, fmt: (v) => `${Math.round(v)}%`, track: () => `linear-gradient(to right, white, black)` },
    ],
    fromHex: (rgb) => rgbToCmyk(rgb),
    toHex: (c) => rgbToHex(cmykToRgb(c)),
  },
  lab: {
    label: () => 'LAB',
    channels: [
      { key: 'l', i18n: 'colorpicker.channel.luminance', min: 0, max: 100, fmt: (v) => `${Math.round(v)}`, track: () => `linear-gradient(to right, black, white)` },
      { key: 'a', i18n: 'colorpicker.channel.a', min: -128, max: 127, fmt: (v) => `${Math.round(v)}`, track: () => `linear-gradient(to right, #008000, #ff0000)` },
      { key: 'b', i18n: 'colorpicker.channel.b', min: -128, max: 127, fmt: (v) => `${Math.round(v)}`, track: () => `linear-gradient(to right, #0000ff, #ffff00)` },
    ],
    fromHex: (rgb) => rgbToLab(rgb),
    toHex: (c) => rgbToHex(labToRgb(c)),
  },
}

const MODE_ORDER = ['picker', 'hsb', 'hsl', 'rgb', 'cmyk', 'lab']

/**
 * Resolves the available modes from the props:
 * - `modes` (allowlist): only those modes (validated against MODE_ORDER, canonical
 *   order). Without the prop → all of them.
 * - `excludeModes` (denylist): removed from the resulting list.
 * - If the combination leaves 0 modes, the full set is restored (defense against
 *   invalid configs).
 */
function resolveAvailableModes(attrs) {
  const { modes, excludeModes } = attrs
  let list = Array.isArray(modes) && modes.length
    ? MODE_ORDER.filter((m) => modes.includes(m))
    : MODE_ORDER
  if (Array.isArray(excludeModes) && excludeModes.length) {
    list = list.filter((m) => !excludeModes.includes(m))
  }
  return list.length ? list : MODE_ORDER
}

const COPY_DURATION = 2000

/**
 * ColorPicker — professional multi-space color picker.
 *
 * "picker" mode (default): 2D Saturation/Brightness area for the current hue +
 * hue slider + hex input + swatch + footer with a mode menu and copy.
 * Alternate modes (HSB, HSL, RGB, CMYK, LAB): row of per-channel sliders with
 * dynamic gradient tracks. Everything updates in real time during the
 * drag and notifies `onchange(hex)` with the normalized hex (`#rrggbb`).
 *
 * Props:
 *   value        — controlled hex (if passed, the parent controls the color).
 *   defaultValue — initial hex in uncontrolled mode (default '#623CEA').
 *   onchange     — (hex: string) => void, notifies on every change.
 *   copy         — shows the copy button in the footer (default true).
 *   modes        — allowlist of spaces to show in the menu (default: all).
 *   excludeModes — denylist of spaces to hide from the menu (default: none).
 *   trigger      — launches the picker as a dropdown from a button/text: string,
 *                  Vnode, or (hex) => Vnode|string. Without it: standalone card.
 *   close        — in dropdown mode, ButtonClose in the top corner:
 *                  'end' (right, default) | 'start' (left) | false.
 *   size         — xs..xl (default md).
 *   className    — extra class on the root.
 *
 * @type {import('mithril').Component<import('./index').ColorPickerAttrs>}
 */
export const ColorPicker = {
  oninit(vnode) {
    const initial = typeof vnode.attrs.value === 'string'
      ? vnode.attrs.value
      : (typeof vnode.attrs.defaultValue === 'string' ? vnode.attrs.defaultValue : '#623CEA')
    vnode.state.hex = rgbToHex(hexToRgb(initial) || { r: 98, g: 60, b: 234 })
    // Hex input draft: allows pasting/editing freely; it is only
    // committed (setHex) when the value is valid, and on blur it reverts to the
    // hex if it was not.
    vnode.state.draft = null
    vnode.state.mode = 'picker'
    vnode.state.open = false // external dropdown (trigger mode)
    vnode.state.menuOpen = false
    vnode.state.copied = false
    vnode.state._copyTimer = null
    vnode.state._drag = null // { mode, channel, el }
  },

  onremove(vnode) {
    if (vnode.state._copyTimer) clearTimeout(vnode.state._copyTimer)
  },

  view(vnode) {
    const { value, defaultValue, onchange, copy = true, size, className, ...rest } = vnode.attrs
    const state = vnode.state

    // Available modes (allowlist/denylist) and resolved active mode: if the
    // current mode fell outside the available ones, it uses the first.
    const availableModes = resolveAvailableModes(vnode.attrs)
    const activeMode = availableModes.includes(state.mode) ? state.mode : availableModes[0]

    // Source of truth: hex (controlled → prop; uncontrolled → state).
    const hex = typeof value === 'string' ? value : state.hex
    const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 }

    const setHex = (next) => {
      const normalized = rgbToHex(hexToRgb(next) || rgb)
      if (typeof value !== 'string') state.hex = normalized
      if (onchange) onchange(normalized)
      m.redraw()
    }

    const mode = MODES[activeMode] || MODES.picker
    const isPicker = activeMode === 'picker'

    // Channels of the current mode, derived from the hex on every render.
    const channels = isPicker ? null : mode.fromHex(rgb)

    // HSB derived for the 2D area / hue of picker mode.
    const hsb = rgbToHsb(rgb)
    const hue = hsb.h

    // Updates a channel (or s/b in picker) and recomputes the hex.
    const setChannel = (channel, valuePct) => {
      if (activeMode === 'picker') {
        // channel: 's' | 'b' — receives 0-100; hue slider passes channel 'h' 0-360.
        const next = channel === 'h'
          ? hsbToRgb({ h: valuePct, s: hsb.s, b: hsb.b })
          : hsbToRgb({ h: hue, s: channel === 's' ? valuePct : hsb.s, b: channel === 'b' ? valuePct : hsb.b })
        setHex(rgbToHex(next))
        return
      }
      const nextChannels = { ...channels, [channel]: valuePct }
      setHex(mode.toHex(nextChannels))
    }

    // Generic drag handler: positions by pointer inside the track.
    const startDrag = (e, channel, min, max) => {
      e.preventDefault()
      const el = e.currentTarget
      el.setPointerCapture?.(e.pointerId)
      state._drag = { channel, min, max, el }
      updateFromPointer(e, channel, min, max)
    }
    const updateFromPointer = (e, channel, min, max) => {
      if (!state._drag) return
      const rect = state._drag.el.getBoundingClientRect()
      const pct = clamp((e.clientX - rect.left) / rect.width, 0, 1)
      const val = min + pct * (max - min)
      setChannel(channel, val)
    }
    const endDrag = (e) => {
      if (state._drag && state._drag.el) state._drag.el.releasePointerCapture?.(e.pointerId)
      state._drag = null
    }

    const onTrackKey = (e, channel, min, max) => {
      const step = e.shiftKey ? 10 : 1
      const cur = activeMode === 'picker'
        ? (channel === 'h' ? hue : channel === 's' ? hsb.s : hsb.b)
        : channels[channel]
      let next
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = cur + step
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = cur - step
      else return
      e.preventDefault()
      setChannel(channel, clamp(next, min, max))
    }

    const handleCopy = () => {
      if (typeof navigator === 'undefined' || !navigator.clipboard) return
      navigator.clipboard.writeText(hex).then(() => {
        state.copied = true
        if (state._copyTimer) clearTimeout(state._copyTimer)
        state._copyTimer = setTimeout(() => { state.copied = false; m.redraw() }, COPY_DURATION)
        m.redraw()
      }).catch(() => { /* clipboard blocked — no-op */ })
    }

    // 2D slider: composite gradient via hue (the recipe paints ::before/::after).
    const gradientCursorLeft = `${hsb.s}%`
    const gradientCursorTop = `${100 - hsb.b}%`

    const styles = colorPicker({ size })

    const renderSlider = (channelDef, opts = {}) => {
      const cur = isPicker
        ? (channelDef.key === 'h' ? hue : channelDef.key === 's' ? hsb.s : hsb.b)
        : channels[channelDef.key]
      const pct = (cur - channelDef.min) / (channelDef.max - channelDef.min) * 100
      const track = m('div', {
        className: cx('colorpicker-track', styles.track, opts.bare && 'colorpicker-hue-track', opts.bare && styles.hueTrack),
        key: opts.bare ? channelDef.key : undefined,
        style: { '--colorpicker-track': channelDef.track(isPicker ? { h: hue, s: hsb.s, b: hsb.b } : channels) },
        role: 'slider',
        tabindex: '0',
        'aria-label': t(channelDef.i18n),
        'aria-valuemin': String(channelDef.min),
        'aria-valuemax': String(channelDef.max),
        'aria-valuenow': String(Math.round(cur)),
        onpointerdown: (e) => startDrag(e, channelDef.key, channelDef.min, channelDef.max),
        onpointermove: (e) => updateFromPointer(e, channelDef.key, channelDef.min, channelDef.max),
        onpointerup: endDrag,
        onpointercancel: endDrag,
        onkeydown: (e) => onTrackKey(e, channelDef.key, channelDef.min, channelDef.max),
      }, m('span', {
        className: cx('colorpicker-thumb', styles.thumb),
        style: { '--colorpicker-thumb-left': `${pct}%` },
      }))

      // "bare" mode (Picker hue): only the track with its thumb, no label or
      // value — it is understood to be the hue.
      if (opts.bare) return track

      return m('div', {
        className: cx('colorpicker-slider-row', styles.sliderRow),
        key: channelDef.key,
      }, [
        m('div', { className: cx('colorpicker-slider-header', styles.sliderHeader) }, [
          m('span', { className: cx('colorpicker-slider-label', styles.sliderLabel) }, t(channelDef.i18n)),
          m('span', { className: cx('colorpicker-slider-value', styles.sliderValue) }, channelDef.fmt(cur)),
        ]),
        track,
      ])
    }

    // ── Picker panel (content without the root card) ────────────────
    const panelContent = [
      isPicker
        ? m('div', { className: cx('colorpicker-picker', styles.picker) }, [
            // 2D S/B area
            m('div', {
              className: cx('colorpicker-gradient', styles.gradient),
              key: 'gradient',
              role: 'slider',
              tabindex: '0',
              'aria-label': t('colorpicker.gradientLabel'),
              'aria-valuemin': '0',
              'aria-valuemax': '100',
              'aria-valuenow': String(Math.round(hsb.s)),
              'aria-valuetext': `${t('colorpicker.channel.saturation')} ${Math.round(hsb.s)}%, ${t('colorpicker.channel.brightness')} ${Math.round(hsb.b)}%`,
              onpointerdown: (e) => startDrag2D(e),
              onpointermove: (e) => update2D(e),
              onpointerup: endDrag,
              onpointercancel: endDrag,
              onkeydown: (e) => onGradientKey(e),
            }, m('span', {
              className: cx('colorpicker-cursor', styles.cursor),
              style: { '--colorpicker-cursor-left': gradientCursorLeft, '--colorpicker-cursor-top': gradientCursorTop },
            })),
            // Hue slider — only the track (bare): the user understands it is
            // the hue, without a label or numeric value.
            renderSlider({ key: 'h', i18n: 'colorpicker.hueLabel', min: 0, max: 360, fmt: (v) => `${Math.round(v)}°`, track: () => 'linear-gradient(to right, hsl(0 100% 50%), hsl(60 100% 50%), hsl(120 100% 50%), hsl(180 100% 50%), hsl(240 100% 50%), hsl(300 100% 50%), hsl(360 100% 50%))' }, { bare: true }),
          ])
        : m('div', { className: cx('colorpicker-sliders', styles.sliders) },
            mode.channels.map(renderSlider)),
      renderHexRow(),
      renderFooter(),
    ]

    // ── Dropdown mode (`trigger` prop) ──────────────────────────────────────
    const { trigger, close, ...dropdownRest } = rest
    if (trigger !== undefined) {
      const triggerNode = typeof trigger === 'function'
        ? trigger(hex)
        : typeof trigger === 'string'
          ? m(Button, { variant: 'ghost', size: 'sm', className: cx('colorpicker-trigger-button', styles.triggerButton) }, [
              m('span', { className: cx('colorpicker-trigger-swatch', styles.triggerSwatch), style: { '--colorpicker-swatch-color': hex } }),
              trigger,
            ])
          : trigger // Vnode: DropdownTrigger clones it with aria + toggle

      const showClose = close !== false
      const closeAlign = close === 'start' ? styles.closeStart : styles.closeEnd

      return m(Dropdown, {
        open: state.open,
        onchange: (next) => { state.open = next; m.redraw() },
        placement: 'bottom-start',
        offset: 4,
        // The panel is not a selectable menu: closeOnSelect=false prevents
        // a click in the NESTED mode menu (or any internal menu
        // item) from closing the external dropdown. Closing is by click outside
        // or by the ButtonClose.
        closeOnSelect: false,
        style: { '--colorpicker-hue': String(Math.round(hue)) },
        ...dropdownRest,
      }, [
        m(DropdownTrigger, {}, triggerNode),
        m(DropdownContent, {},
          m('div', { className: cx('colorpicker-dropdown-panel', styles.dropdownPanel, showClose && 'colorpicker-dropdown-panel-close', showClose && styles.dropdownPanelClose) }, [
            showClose && m(ButtonClose, {
              size: 'sm',
              variant: 'ghost',
              className: cx('colorpicker-close-button', styles.closeButton, closeAlign),
              'aria-label': t('colorpicker.close'),
              onclick: () => { state.open = false; m.redraw() },
            }),
            panelContent,
          ]),
        ),
      ])
    }

    // ── Standalone mode (card) ───────────────────────────────────────────
    return m('div', {
      className: cx('colorpicker', styles.root, className),
      style: { '--colorpicker-hue': String(Math.round(hue)) },
      ...rest,
    }, panelContent)

    // ── internal view helpers (close over state/rgb/hsb) ────────────

    /** 2D drag: computes S (x) and B (y) from the pointer inside the area. */
    function startDrag2D(e) {
      e.preventDefault()
      const el = e.currentTarget
      el.setPointerCapture?.(e.pointerId)
      state._drag = { channel: '2d', el }
      update2D(e)
    }
    function update2D(e) {
      if (!state._drag || state._drag.channel !== '2d') return
      const rect = state._drag.el.getBoundingClientRect()
      const s = clamp((e.clientX - rect.left) / rect.width, 0, 1) * 100
      const b = clamp(1 - (e.clientY - rect.top) / rect.height, 0, 1) * 100
      setHex(rgbToHex(hsbToRgb({ h: hue, s, b })))
    }
    function onGradientKey(e) {
      const step = e.shiftKey ? 10 : 1
      let s = hsb.s, b = hsb.b
      if (e.key === 'ArrowRight') s += step
      else if (e.key === 'ArrowLeft') s -= step
      else if (e.key === 'ArrowUp') b += step
      else if (e.key === 'ArrowDown') b -= step
      else return
      e.preventDefault()
      setHex(rgbToHex(hsbToRgb({ h: hue, s: clamp(s, 0, 100), b: clamp(b, 0, 100) })))
    }

    function renderHexRow() {
      // While there is a draft (focused input), what the user
      // types/pastes is shown; if valid it is committed live, if not, on blur it
      // reverts to the current hex.
      const inputValue = state.draft !== null ? state.draft : hex
      return m('div', { className: cx('colorpicker-hex-row', styles.hexRow) }, [
        m('input', {
          type: 'text',
          className: cx('colorpicker-hex-input', styles.hexInput),
          value: inputValue,
          'aria-label': t('colorpicker.hexLabel'),
          spellcheck: 'false',
          autocomplete: 'off',
          autocapitalize: 'off',
          onfocus: () => {
            state.draft = hex
            m.redraw()
          },
          oninput: (e) => {
            const raw = e.target.value
            // The draft always reflects what is in the input (allows pasting
            // anything); it is committed only if it parses as hex (tolerates
            // spaces and an optional #). setHex receives the clean version.
            state.draft = raw
            const cleaned = raw.replace(/\s+/g, '')
            const parsed = hexToRgb(cleaned)
            if (parsed) setHex(cleaned)
            else m.redraw()
          },
          onblur: () => {
            // On exit, if the draft was valid it was already committed in oninput; if
            // not, it reverts to the hex. It always redraws to sync the
            // input value with the hex (or the null draft → hex).
            state.draft = null
            m.redraw()
          },
        }),
        m('span', {
          className: cx('colorpicker-swatch', styles.swatch),
          style: { '--colorpicker-swatch-color': hex },
          'aria-hidden': 'true',
        }),
      ])
    }

    function renderFooter() {
      // With a single available mode there is nothing to choose: the
      // static label is shown (no dropdown or chevron).
      const modeControl = availableModes.length === 1
        ? m('span', { className: cx('colorpicker-mode-button', styles.modeButton) }, mode.label())
        : m(Dropdown, {
            open: state.menuOpen,
            onchange: (next) => { state.menuOpen = next; m.redraw() },
            placement: 'top-start',
            offset: 4,
          }, [
            m(DropdownTrigger, {},
              m('button', {
                type: 'button',
                className: cx('colorpicker-mode-button', styles.modeButton),
                'aria-haspopup': 'menu',
                'aria-expanded': state.menuOpen ? 'true' : 'false',
              }, [
                mode.label(),
                m(ChevronDown, {
                  size: 14,
                  'aria-hidden': 'true',
                }),
              ])),
            m(DropdownContent, {},
              m(Menu, {},
                availableModes.map((key) => m(MenuItem, {
                  key,
                  active: activeMode === key,
                  onclick: () => {
                    state.mode = key
                    state.menuOpen = false
                    m.redraw()
                  },
                }, [
                  MODES[key].label(),
                  activeMode === key ? m(Check, { size: 14, 'aria-hidden': 'true' }) : null,
                ])),
              )),
          ])

      return m('div', { className: cx('colorpicker-footer', styles.footer) }, [
        modeControl,
        copy
          ? m('button', {
              type: 'button',
              className: cx('colorpicker-copy-button', styles.copyButton),
              'aria-label': state.copied ? t('colorpicker.copied') : t('colorpicker.copy'),
              onclick: handleCopy,
            }, state.copied ? m(Check, { size: 14 }) : m(Copy, { size: 14 }))
          : null,
      ])
    }
  },
}
