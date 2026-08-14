/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface MaskVariant {
  shape: "square" | "squircle" | "decagon" | "diamond" | "heart" | "hexagon" | "hexagon-2" | "circle" | "pentagon" | "star" | "star-2" | "triangle" | "triangle-2" | "triangle-3" | "triangle-4"
half: "1" | "2"
}

type MaskVariantMap = {
  [key in keyof MaskVariant]: Array<MaskVariant[key]>
}



export type MaskVariantProps = {
  [key in keyof MaskVariant]?: ConditionalValue<MaskVariant[key]> | undefined
}

export interface MaskRecipe {
  
  __type: MaskVariantProps
  (props?: MaskVariantProps): string
  raw: (props?: MaskVariantProps) => MaskVariantProps
  variantMap: MaskVariantMap
  variantKeys: Array<keyof MaskVariant>
  splitVariantProps<Props extends MaskVariantProps>(props: Props): [MaskVariantProps, Pretty<DistributiveOmit<Props, keyof MaskVariantProps>>]
  getVariantProps: (props?: MaskVariantProps) => MaskVariantProps
}


export declare const mask: MaskRecipe