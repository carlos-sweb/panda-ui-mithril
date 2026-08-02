import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface HeroAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface HeroContentAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface HeroOverlayAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Hero: Component<HeroAttrs>
export const HeroContent: Component<HeroContentAttrs>
export const HeroOverlay: Component<HeroOverlayAttrs>
