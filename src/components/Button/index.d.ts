import { Vnode } from 'mithril'
import { ComponentAttrs, DaisyColor, DaisyStyle, DaisySize } from '../../types'

export interface ButtonAttrs extends ComponentAttrs {
  color?: DaisyColor
  variant?: DaisyStyle
  size?: DaisySize
  active?: boolean
  disabled?: boolean
  block?: boolean
  wide?: boolean
  square?: boolean
  circle?: boolean
  href?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}
