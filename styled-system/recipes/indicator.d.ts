/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface IndicatorVariant {
  horizontal: "start" | "center" | "end"
vertical: "top" | "middle" | "bottom"
}

type IndicatorVariantMap = {
  [key in keyof IndicatorVariant]: Array<IndicatorVariant[key]>
}



export type IndicatorVariantProps = {
  [key in keyof IndicatorVariant]?: ConditionalValue<IndicatorVariant[key]> | undefined
}

export interface IndicatorRecipe {
  
  __type: IndicatorVariantProps
  (props?: IndicatorVariantProps): string
  raw: (props?: IndicatorVariantProps) => IndicatorVariantProps
  variantMap: IndicatorVariantMap
  variantKeys: Array<keyof IndicatorVariant>
  splitVariantProps<Props extends IndicatorVariantProps>(props: Props): [IndicatorVariantProps, Pretty<DistributiveOmit<Props, keyof IndicatorVariantProps>>]
  getVariantProps: (props?: IndicatorVariantProps) => IndicatorVariantProps
}


export declare const indicator: IndicatorRecipe