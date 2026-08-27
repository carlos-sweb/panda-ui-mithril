/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface NavbarVariant {
  /**
 * @default "static"
 */
position: "static" | "sticky" | "fixed"
/**
 * @default "base"
 */
color: "base" | "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
/**
 * @default "md"
 */
size: "sm" | "md" | "lg"
/**
 * @default false
 */
border: boolean
/**
 * @default "none"
 */
shadow: "none" | "sm" | "md" | "lg"
/**
 * @default false
 */
glass: boolean
/**
 * @default false
 */
active: boolean
/**
 * @default false
 */
disabled: boolean
}

type NavbarVariantMap = {
  [key in keyof NavbarVariant]: Array<NavbarVariant[key]>
}

type NavbarSlot = "navbar" | "container" | "start" | "center" | "end" | "brand" | "menu" | "link" | "toggle"

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