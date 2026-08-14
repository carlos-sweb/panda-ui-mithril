/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface JoinVariant {
  vertical: boolean
}

type JoinVariantMap = {
  [key in keyof JoinVariant]: Array<JoinVariant[key]>
}



export type JoinVariantProps = {
  [key in keyof JoinVariant]?: ConditionalValue<JoinVariant[key]> | undefined
}

export interface JoinRecipe {
  
  __type: JoinVariantProps
  (props?: JoinVariantProps): string
  raw: (props?: JoinVariantProps) => JoinVariantProps
  variantMap: JoinVariantMap
  variantKeys: Array<keyof JoinVariant>
  splitVariantProps<Props extends JoinVariantProps>(props: Props): [JoinVariantProps, Pretty<DistributiveOmit<Props, keyof JoinVariantProps>>]
  getVariantProps: (props?: JoinVariantProps) => JoinVariantProps
}


export declare const join: JoinRecipe