/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SwapVariant {
  style: "rotate" | "flip"
/**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
}

type SwapVariantMap = {
  [key in keyof SwapVariant]: Array<SwapVariant[key]>
}



export type SwapVariantProps = {
  [key in keyof SwapVariant]?: ConditionalValue<SwapVariant[key]> | undefined
}

export interface SwapRecipe {
  
  __type: SwapVariantProps
  (props?: SwapVariantProps): string
  raw: (props?: SwapVariantProps) => SwapVariantProps
  variantMap: SwapVariantMap
  variantKeys: Array<keyof SwapVariant>
  splitVariantProps<Props extends SwapVariantProps>(props: Props): [SwapVariantProps, Pretty<DistributiveOmit<Props, keyof SwapVariantProps>>]
  getVariantProps: (props?: SwapVariantProps) => SwapVariantProps
}


export declare const swap: SwapRecipe