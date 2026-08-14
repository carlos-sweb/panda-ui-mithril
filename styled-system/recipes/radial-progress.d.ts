/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface RadialProgressVariant {
  
}

type RadialProgressVariantMap = {
  [key in keyof RadialProgressVariant]: Array<RadialProgressVariant[key]>
}



export type RadialProgressVariantProps = {
  [key in keyof RadialProgressVariant]?: ConditionalValue<RadialProgressVariant[key]> | undefined
}

export interface RadialProgressRecipe {
  
  __type: RadialProgressVariantProps
  (props?: RadialProgressVariantProps): string
  raw: (props?: RadialProgressVariantProps) => RadialProgressVariantProps
  variantMap: RadialProgressVariantMap
  variantKeys: Array<keyof RadialProgressVariant>
  splitVariantProps<Props extends RadialProgressVariantProps>(props: Props): [RadialProgressVariantProps, Pretty<DistributiveOmit<Props, keyof RadialProgressVariantProps>>]
  getVariantProps: (props?: RadialProgressVariantProps) => RadialProgressVariantProps
}


export declare const radialProgress: RadialProgressRecipe