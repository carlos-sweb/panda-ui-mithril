/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface LoadingVariant {
  variant: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity"
/**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
}

type LoadingVariantMap = {
  [key in keyof LoadingVariant]: Array<LoadingVariant[key]>
}



export type LoadingVariantProps = {
  [key in keyof LoadingVariant]?: ConditionalValue<LoadingVariant[key]> | undefined
}

export interface LoadingRecipe {
  
  __type: LoadingVariantProps
  (props?: LoadingVariantProps): string
  raw: (props?: LoadingVariantProps) => LoadingVariantProps
  variantMap: LoadingVariantMap
  variantKeys: Array<keyof LoadingVariant>
  splitVariantProps<Props extends LoadingVariantProps>(props: Props): [LoadingVariantProps, Pretty<DistributiveOmit<Props, keyof LoadingVariantProps>>]
  getVariantProps: (props?: LoadingVariantProps) => LoadingVariantProps
}


export declare const loading: LoadingRecipe