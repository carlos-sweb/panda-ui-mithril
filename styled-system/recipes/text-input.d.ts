/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TextInputVariant {
  color: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
/**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
ghost: boolean
}

type TextInputVariantMap = {
  [key in keyof TextInputVariant]: Array<TextInputVariant[key]>
}



export type TextInputVariantProps = {
  [key in keyof TextInputVariant]?: ConditionalValue<TextInputVariant[key]> | undefined
}

export interface TextInputRecipe {
  
  __type: TextInputVariantProps
  (props?: TextInputVariantProps): string
  raw: (props?: TextInputVariantProps) => TextInputVariantProps
  variantMap: TextInputVariantMap
  variantKeys: Array<keyof TextInputVariant>
  splitVariantProps<Props extends TextInputVariantProps>(props: Props): [TextInputVariantProps, Pretty<DistributiveOmit<Props, keyof TextInputVariantProps>>]
  getVariantProps: (props?: TextInputVariantProps) => TextInputVariantProps
}


export declare const textInput: TextInputRecipe