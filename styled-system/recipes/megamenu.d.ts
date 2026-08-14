/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface MegamenuVariant {
  /**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
vertical: boolean
active: boolean
chevron: boolean
}

type MegamenuVariantMap = {
  [key in keyof MegamenuVariant]: Array<MegamenuVariant[key]>
}

type MegamenuSlot = "megamenu" | "item" | "trigger" | "panel" | "active"

export type MegamenuVariantProps = {
  [key in keyof MegamenuVariant]?: ConditionalValue<MegamenuVariant[key]> | undefined
}

export interface MegamenuRecipe {
  __slot: MegamenuSlot
  __type: MegamenuVariantProps
  (props?: MegamenuVariantProps): Pretty<Record<MegamenuSlot, string>>
  raw: (props?: MegamenuVariantProps) => MegamenuVariantProps
  variantMap: MegamenuVariantMap
  variantKeys: Array<keyof MegamenuVariant>
  splitVariantProps<Props extends MegamenuVariantProps>(props: Props): [MegamenuVariantProps, Pretty<DistributiveOmit<Props, keyof MegamenuVariantProps>>]
  getVariantProps: (props?: MegamenuVariantProps) => MegamenuVariantProps
}


export declare const megamenu: MegamenuRecipe