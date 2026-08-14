/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CollapseVariant {
  arrow: boolean
plus: boolean
border: boolean
}

type CollapseVariantMap = {
  [key in keyof CollapseVariant]: Array<CollapseVariant[key]>
}



export type CollapseVariantProps = {
  [key in keyof CollapseVariant]?: ConditionalValue<CollapseVariant[key]> | undefined
}

export interface CollapseRecipe {
  
  __type: CollapseVariantProps
  (props?: CollapseVariantProps): string
  raw: (props?: CollapseVariantProps) => CollapseVariantProps
  variantMap: CollapseVariantMap
  variantKeys: Array<keyof CollapseVariant>
  splitVariantProps<Props extends CollapseVariantProps>(props: Props): [CollapseVariantProps, Pretty<DistributiveOmit<Props, keyof CollapseVariantProps>>]
  getVariantProps: (props?: CollapseVariantProps) => CollapseVariantProps
}


export declare const collapse: CollapseRecipe