/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface FabLabelVariant {
  
}

type FabLabelVariantMap = {
  [key in keyof FabLabelVariant]: Array<FabLabelVariant[key]>
}



export type FabLabelVariantProps = {
  [key in keyof FabLabelVariant]?: ConditionalValue<FabLabelVariant[key]> | undefined
}

export interface FabLabelRecipe {
  
  __type: FabLabelVariantProps
  (props?: FabLabelVariantProps): string
  raw: (props?: FabLabelVariantProps) => FabLabelVariantProps
  variantMap: FabLabelVariantMap
  variantKeys: Array<keyof FabLabelVariant>
  splitVariantProps<Props extends FabLabelVariantProps>(props: Props): [FabLabelVariantProps, Pretty<DistributiveOmit<Props, keyof FabLabelVariantProps>>]
  getVariantProps: (props?: FabLabelVariantProps) => FabLabelVariantProps
}


export declare const fabLabel: FabLabelRecipe