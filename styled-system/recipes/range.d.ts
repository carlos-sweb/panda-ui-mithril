/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface RangeVariant {
  color: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
/**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
vertical: boolean
}

type RangeVariantMap = {
  [key in keyof RangeVariant]: Array<RangeVariant[key]>
}



export type RangeVariantProps = {
  [key in keyof RangeVariant]?: ConditionalValue<RangeVariant[key]> | undefined
}

export interface RangeRecipe {
  
  __type: RangeVariantProps
  (props?: RangeVariantProps): string
  raw: (props?: RangeVariantProps) => RangeVariantProps
  variantMap: RangeVariantMap
  variantKeys: Array<keyof RangeVariant>
  splitVariantProps<Props extends RangeVariantProps>(props: Props): [RangeVariantProps, Pretty<DistributiveOmit<Props, keyof RangeVariantProps>>]
  getVariantProps: (props?: RangeVariantProps) => RangeVariantProps
}


export declare const range: RangeRecipe