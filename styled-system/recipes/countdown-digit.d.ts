/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CountdownDigitVariant {
  
}

type CountdownDigitVariantMap = {
  [key in keyof CountdownDigitVariant]: Array<CountdownDigitVariant[key]>
}



export type CountdownDigitVariantProps = {
  [key in keyof CountdownDigitVariant]?: ConditionalValue<CountdownDigitVariant[key]> | undefined
}

export interface CountdownDigitRecipe {
  
  __type: CountdownDigitVariantProps
  (props?: CountdownDigitVariantProps): string
  raw: (props?: CountdownDigitVariantProps) => CountdownDigitVariantProps
  variantMap: CountdownDigitVariantMap
  variantKeys: Array<keyof CountdownDigitVariant>
  splitVariantProps<Props extends CountdownDigitVariantProps>(props: Props): [CountdownDigitVariantProps, Pretty<DistributiveOmit<Props, keyof CountdownDigitVariantProps>>]
  getVariantProps: (props?: CountdownDigitVariantProps) => CountdownDigitVariantProps
}


export declare const countdownDigit: CountdownDigitRecipe