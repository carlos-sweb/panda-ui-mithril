/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface BoxVariant {
  /**
 * @default "md"
 */
padding: "sm" | "md" | "lg"
/**
 * @default "md"
 */
shadow: "sm" | "md" | "lg" | "none"
}

type BoxVariantMap = {
  [key in keyof BoxVariant]: Array<BoxVariant[key]>
}



export type BoxVariantProps = {
  [key in keyof BoxVariant]?: ConditionalValue<BoxVariant[key]> | undefined
}

export interface BoxRecipe {
  
  __type: BoxVariantProps
  (props?: BoxVariantProps): string
  raw: (props?: BoxVariantProps) => BoxVariantProps
  variantMap: BoxVariantMap
  variantKeys: Array<keyof BoxVariant>
  splitVariantProps<Props extends BoxVariantProps>(props: Props): [BoxVariantProps, Pretty<DistributiveOmit<Props, keyof BoxVariantProps>>]
  getVariantProps: (props?: BoxVariantProps) => BoxVariantProps
}


export declare const box: BoxRecipe