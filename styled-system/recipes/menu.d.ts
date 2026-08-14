/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface MenuVariant {
  horizontal: boolean
/**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
}

type MenuVariantMap = {
  [key in keyof MenuVariant]: Array<MenuVariant[key]>
}



export type MenuVariantProps = {
  [key in keyof MenuVariant]?: ConditionalValue<MenuVariant[key]> | undefined
}

export interface MenuRecipe {
  
  __type: MenuVariantProps
  (props?: MenuVariantProps): string
  raw: (props?: MenuVariantProps) => MenuVariantProps
  variantMap: MenuVariantMap
  variantKeys: Array<keyof MenuVariant>
  splitVariantProps<Props extends MenuVariantProps>(props: Props): [MenuVariantProps, Pretty<DistributiveOmit<Props, keyof MenuVariantProps>>]
  getVariantProps: (props?: MenuVariantProps) => MenuVariantProps
}


export declare const menu: MenuRecipe