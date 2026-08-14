/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface FilterVariant {
  
}

type FilterVariantMap = {
  [key in keyof FilterVariant]: Array<FilterVariant[key]>
}



export type FilterVariantProps = {
  [key in keyof FilterVariant]?: ConditionalValue<FilterVariant[key]> | undefined
}

export interface FilterRecipe {
  
  __type: FilterVariantProps
  (props?: FilterVariantProps): string
  raw: (props?: FilterVariantProps) => FilterVariantProps
  variantMap: FilterVariantMap
  variantKeys: Array<keyof FilterVariant>
  splitVariantProps<Props extends FilterVariantProps>(props: Props): [FilterVariantProps, Pretty<DistributiveOmit<Props, keyof FilterVariantProps>>]
  getVariantProps: (props?: FilterVariantProps) => FilterVariantProps
}


export declare const filter: FilterRecipe