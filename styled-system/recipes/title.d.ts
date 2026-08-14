/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TitleVariant {
  /**
 * @default "1"
 */
size: "1" | "2" | "3" | "4" | "5" | "6" | "7"
color: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
/**
 * @default "left"
 */
align: "left" | "center" | "right" | "justify"
/**
 * @default "none"
 */
transform: "none" | "capitalize" | "uppercase" | "lowercase"
/**
 * @default "normal"
 */
weight: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold"
truncate: boolean
italic: boolean
}

type TitleVariantMap = {
  [key in keyof TitleVariant]: Array<TitleVariant[key]>
}



export type TitleVariantProps = {
  [key in keyof TitleVariant]?: ConditionalValue<TitleVariant[key]> | undefined
}

export interface TitleRecipe {
  
  __type: TitleVariantProps
  (props?: TitleVariantProps): string
  raw: (props?: TitleVariantProps) => TitleVariantProps
  variantMap: TitleVariantMap
  variantKeys: Array<keyof TitleVariant>
  splitVariantProps<Props extends TitleVariantProps>(props: Props): [TitleVariantProps, Pretty<DistributiveOmit<Props, keyof TitleVariantProps>>]
  getVariantProps: (props?: TitleVariantProps) => TitleVariantProps
}


export declare const title: TitleRecipe