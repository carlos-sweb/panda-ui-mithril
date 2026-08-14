/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface JoinItemVariant {
  
}

type JoinItemVariantMap = {
  [key in keyof JoinItemVariant]: Array<JoinItemVariant[key]>
}



export type JoinItemVariantProps = {
  [key in keyof JoinItemVariant]?: ConditionalValue<JoinItemVariant[key]> | undefined
}

export interface JoinItemRecipe {
  
  __type: JoinItemVariantProps
  (props?: JoinItemVariantProps): string
  raw: (props?: JoinItemVariantProps) => JoinItemVariantProps
  variantMap: JoinItemVariantMap
  variantKeys: Array<keyof JoinItemVariant>
  splitVariantProps<Props extends JoinItemVariantProps>(props: Props): [JoinItemVariantProps, Pretty<DistributiveOmit<Props, keyof JoinItemVariantProps>>]
  getVariantProps: (props?: JoinItemVariantProps) => JoinItemVariantProps
}


export declare const joinItem: JoinItemRecipe