/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface RatingVariant {
  /**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
/**
 * @default "warning"
 */
color: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
state: "empty" | "full"
/**
 * @default false
 */
readonly: boolean
}

type RatingVariantMap = {
  [key in keyof RatingVariant]: Array<RatingVariant[key]>
}

type RatingSlot = "root" | "star"

export type RatingVariantProps = {
  [key in keyof RatingVariant]?: ConditionalValue<RatingVariant[key]> | undefined
}

export interface RatingRecipe {
  __slot: RatingSlot
  __type: RatingVariantProps
  (props?: RatingVariantProps): Pretty<Record<RatingSlot, string>>
  raw: (props?: RatingVariantProps) => RatingVariantProps
  variantMap: RatingVariantMap
  variantKeys: Array<keyof RatingVariant>
  splitVariantProps<Props extends RatingVariantProps>(props: Props): [RatingVariantProps, Pretty<DistributiveOmit<Props, keyof RatingVariantProps>>]
  getVariantProps: (props?: RatingVariantProps) => RatingVariantProps
}


export declare const rating: RatingRecipe