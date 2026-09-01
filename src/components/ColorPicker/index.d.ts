import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export type ColorPickerMode = 'picker' | 'hsb' | 'hsl' | 'rgb' | 'cmyk' | 'lab'

export interface ColorPickerAttrs extends ComponentAttrs {
  /** Controlled mode: hex drives the color from outside (`#rrggbb`). */
  value?: string
  /** Uncontrolled mode: initial hex (default '#623CEA'). */
  defaultValue?: string
  /** Fired with the normalized hex (`#rrggbb`) on every change (drag/input). */
  onchange?: (hex: string) => void
  /** Show the copy-to-clipboard button in the footer. Default true. */
  copy?: boolean
  /** Whitelist of color spaces shown in the mode menu (default: all). */
  modes?: ColorPickerMode[]
  /** Hide specific color spaces from the mode menu (default: []). */
  excludeModes?: ColorPickerMode[]
  /** Launch the picker as a dropdown from a trigger: a string (button with
   *  color swatch + text), a Vnode (cloned with aria/toggle), or a function
   *  receiving the current hex. Without it, renders a standalone card. */
  trigger?: string | Vnode | ((hex: string) => Vnode | string)
  /** In dropdown mode, show a ButtonClose in the top corner: 'end' (right,
   *  default), 'start' (left), or false to hide it. */
  close?: boolean | 'start' | 'end'
  /** Panel width: xs..xl (default md). */
  size?: PumSize
  children?: unknown
  [key: string]: unknown
}

export const ColorPicker: Component<ColorPickerAttrs>
