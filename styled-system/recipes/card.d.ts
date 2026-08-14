/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CardVariant {
  /**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
border: boolean
dash: boolean
side: boolean
imageFull: boolean
justify: "start" | "center" | "end" | "between"
}

type CardVariantMap = {
  [key in keyof CardVariant]: Array<CardVariant[key]>
}

type CardSlot = "card" | "body" | "title" | "actions"

export type CardVariantProps = {
  [key in keyof CardVariant]?: ConditionalValue<CardVariant[key]> | undefined
}

export interface CardRecipe {
  __slot: CardSlot
  __type: CardVariantProps
  (props?: CardVariantProps): Pretty<Record<CardSlot, string>>
  raw: (props?: CardVariantProps) => CardVariantProps
  variantMap: CardVariantMap
  variantKeys: Array<keyof CardVariant>
  splitVariantProps<Props extends CardVariantProps>(props: Props): [CardVariantProps, Pretty<DistributiveOmit<Props, keyof CardVariantProps>>]
  getVariantProps: (props?: CardVariantProps) => CardVariantProps
}


export declare const card: CardRecipe