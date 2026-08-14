/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface FooterVariant {
  center: boolean
direction: "horizontal" | "vertical"
}

type FooterVariantMap = {
  [key in keyof FooterVariant]: Array<FooterVariant[key]>
}

type FooterSlot = "footer" | "title"

export type FooterVariantProps = {
  [key in keyof FooterVariant]?: FooterVariant[key] | undefined
}

export interface FooterRecipe {
  __slot: FooterSlot
  __type: FooterVariantProps
  (props?: FooterVariantProps): Pretty<Record<FooterSlot, string>>
  raw: (props?: FooterVariantProps) => FooterVariantProps
  variantMap: FooterVariantMap
  variantKeys: Array<keyof FooterVariant>
  splitVariantProps<Props extends FooterVariantProps>(props: Props): [FooterVariantProps, Pretty<DistributiveOmit<Props, keyof FooterVariantProps>>]
  getVariantProps: (props?: FooterVariantProps) => FooterVariantProps
}


export declare const footer: FooterRecipe