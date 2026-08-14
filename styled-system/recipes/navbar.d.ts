/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface NavbarVariant {
  
}

type NavbarVariantMap = {
  [key in keyof NavbarVariant]: Array<NavbarVariant[key]>
}

type NavbarSlot = "navbar" | "start" | "center" | "end"

export type NavbarVariantProps = {
  [key in keyof NavbarVariant]?: ConditionalValue<NavbarVariant[key]> | undefined
}

export interface NavbarRecipe {
  __slot: NavbarSlot
  __type: NavbarVariantProps
  (props?: NavbarVariantProps): Pretty<Record<NavbarSlot, string>>
  raw: (props?: NavbarVariantProps) => NavbarVariantProps
  variantMap: NavbarVariantMap
  variantKeys: Array<keyof NavbarVariant>
  splitVariantProps<Props extends NavbarVariantProps>(props: Props): [NavbarVariantProps, Pretty<DistributiveOmit<Props, keyof NavbarVariantProps>>]
  getVariantProps: (props?: NavbarVariantProps) => NavbarVariantProps
}


export declare const navbar: NavbarRecipe