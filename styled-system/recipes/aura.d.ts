/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface AuraVariant {
  /**
 * @default "default"
 */
variant: "default" | "rainbow" | "holo" | "dual" | "silver" | "gold" | "glow"
shape: "box" | "field" | "selector"
/**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
}

type AuraVariantMap = {
  [key in keyof AuraVariant]: Array<AuraVariant[key]>
}



export type AuraVariantProps = {
  [key in keyof AuraVariant]?: ConditionalValue<AuraVariant[key]> | undefined
}

export interface AuraRecipe {
  
  __type: AuraVariantProps
  (props?: AuraVariantProps): string
  raw: (props?: AuraVariantProps) => AuraVariantProps
  variantMap: AuraVariantMap
  variantKeys: Array<keyof AuraVariant>
  splitVariantProps<Props extends AuraVariantProps>(props: Props): [AuraVariantProps, Pretty<DistributiveOmit<Props, keyof AuraVariantProps>>]
  getVariantProps: (props?: AuraVariantProps) => AuraVariantProps
}


export declare const aura: AuraRecipe