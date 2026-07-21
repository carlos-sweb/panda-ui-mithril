import { Vnode } from 'mithril'
import { ComponentAttrs, DaisyColor } from '../../types'

export interface AlertAttrs extends ComponentAttrs {
  variant?: 'outline' | 'dash' | 'soft'
  color?: Extract<DaisyColor, 'info' | 'success' | 'warning' | 'error'>
  direction?: 'horizontal' | 'vertical'
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}
