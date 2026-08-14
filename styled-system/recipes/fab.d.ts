/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface FabVariant {
  
}

type FabVariantMap = {
  [key in keyof FabVariant]: Array<FabVariant[key]>
}



export type FabVariantProps = {
  [key in keyof FabVariant]?: ConditionalValue<FabVariant[key]> | undefined
}

export interface FabRecipe {
  
  __type: FabVariantProps
  (props?: FabVariantProps): string
  raw: (props?: FabVariantProps) => FabVariantProps
  variantMap: FabVariantMap
  variantKeys: Array<keyof FabVariant>
  splitVariantProps<Props extends FabVariantProps>(props: Props): [FabVariantProps, Pretty<DistributiveOmit<Props, keyof FabVariantProps>>]
  getVariantProps: (props?: FabVariantProps) => FabVariantProps
}


export declare const fab: FabRecipe