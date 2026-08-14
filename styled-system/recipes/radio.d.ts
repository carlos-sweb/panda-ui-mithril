/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface RadioVariant {
  color: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
/**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
}

type RadioVariantMap = {
  [key in keyof RadioVariant]: Array<RadioVariant[key]>
}



export type RadioVariantProps = {
  [key in keyof RadioVariant]?: ConditionalValue<RadioVariant[key]> | undefined
}

export interface RadioRecipe {
  
  __type: RadioVariantProps
  (props?: RadioVariantProps): string
  raw: (props?: RadioVariantProps) => RadioVariantProps
  variantMap: RadioVariantMap
  variantKeys: Array<keyof RadioVariant>
  splitVariantProps<Props extends RadioVariantProps>(props: Props): [RadioVariantProps, Pretty<DistributiveOmit<Props, keyof RadioVariantProps>>]
  getVariantProps: (props?: RadioVariantProps) => RadioVariantProps
}


export declare const radio: RadioRecipe