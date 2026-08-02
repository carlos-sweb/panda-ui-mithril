import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface CarouselAttrs extends ComponentAttrs {
  direction?: 'horizontal' | 'vertical'
  align?: 'start' | 'center' | 'end'
  start?: boolean
  center?: boolean
  end?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface CarouselItemAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Carousel: Component<CarouselAttrs>
export const CarouselItem: Component<CarouselItemAttrs>
