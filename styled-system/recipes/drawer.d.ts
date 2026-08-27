/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface DrawerVariant {
  position: "top" | "bottom" | "start" | "end"
size: "xs" | "sm" | "md" | "lg" | "xl" | "full"
}

type DrawerVariantMap = {
  [key in keyof DrawerVariant]: Array<DrawerVariant[key]>
}

type DrawerSlot = "drawer" | "box" | "action" | "backdrop" | "header" | "body" | "footer"

export type DrawerVariantProps = {
  [key in keyof DrawerVariant]?: ConditionalValue<DrawerVariant[key]> | undefined
}

export interface DrawerRecipe {
  __slot: DrawerSlot
  __type: DrawerVariantProps
  (props?: DrawerVariantProps): Pretty<Record<DrawerSlot, string>>
  raw: (props?: DrawerVariantProps) => DrawerVariantProps
  variantMap: DrawerVariantMap
  variantKeys: Array<keyof DrawerVariant>
  splitVariantProps<Props extends DrawerVariantProps>(props: Props): [DrawerVariantProps, Pretty<DistributiveOmit<Props, keyof DrawerVariantProps>>]
  getVariantProps: (props?: DrawerVariantProps) => DrawerVariantProps
}


export declare const drawer: DrawerRecipe