/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CountdownVariant {
  
}

type CountdownVariantMap = {
  [key in keyof CountdownVariant]: Array<CountdownVariant[key]>
}



export type CountdownVariantProps = {
  [key in keyof CountdownVariant]?: ConditionalValue<CountdownVariant[key]> | undefined
}

export interface CountdownRecipe {
  
  __type: CountdownVariantProps
  (props?: CountdownVariantProps): string
  raw: (props?: CountdownVariantProps) => CountdownVariantProps
  variantMap: CountdownVariantMap
  variantKeys: Array<keyof CountdownVariant>
  splitVariantProps<Props extends CountdownVariantProps>(props: Props): [CountdownVariantProps, Pretty<DistributiveOmit<Props, keyof CountdownVariantProps>>]
  getVariantProps: (props?: CountdownVariantProps) => CountdownVariantProps
}


export declare const countdown: CountdownRecipe