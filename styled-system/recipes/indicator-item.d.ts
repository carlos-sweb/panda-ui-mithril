/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface IndicatorItemVariant {
  
}

type IndicatorItemVariantMap = {
  [key in keyof IndicatorItemVariant]: Array<IndicatorItemVariant[key]>
}



export type IndicatorItemVariantProps = {
  [key in keyof IndicatorItemVariant]?: ConditionalValue<IndicatorItemVariant[key]> | undefined
}

export interface IndicatorItemRecipe {
  
  __type: IndicatorItemVariantProps
  (props?: IndicatorItemVariantProps): string
  raw: (props?: IndicatorItemVariantProps) => IndicatorItemVariantProps
  variantMap: IndicatorItemVariantMap
  variantKeys: Array<keyof IndicatorItemVariant>
  splitVariantProps<Props extends IndicatorItemVariantProps>(props: Props): [IndicatorItemVariantProps, Pretty<DistributiveOmit<Props, keyof IndicatorItemVariantProps>>]
  getVariantProps: (props?: IndicatorItemVariantProps) => IndicatorItemVariantProps
}


export declare const indicatorItem: IndicatorItemRecipe