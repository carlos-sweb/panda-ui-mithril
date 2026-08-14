/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface OptVariant {
  color: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
/**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
joined: boolean
}

type OptVariantMap = {
  [key in keyof OptVariant]: Array<OptVariant[key]>
}



export type OptVariantProps = {
  [key in keyof OptVariant]?: ConditionalValue<OptVariant[key]> | undefined
}

export interface OptRecipe {
  
  __type: OptVariantProps
  (props?: OptVariantProps): string
  raw: (props?: OptVariantProps) => OptVariantProps
  variantMap: OptVariantMap
  variantKeys: Array<keyof OptVariant>
  splitVariantProps<Props extends OptVariantProps>(props: Props): [OptVariantProps, Pretty<DistributiveOmit<Props, keyof OptVariantProps>>]
  getVariantProps: (props?: OptVariantProps) => OptVariantProps
}


export declare const opt: OptRecipe