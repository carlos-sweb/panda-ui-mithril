/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface DropdownVariant {
  /**
 * @default "bottom-start"
 */
placement: "bottom-start" | "bottom-center" | "bottom-end" | "top-start" | "top-center" | "top-end" | "left-start" | "left-center" | "left-end" | "right-start" | "right-center" | "right-end"
open: boolean
/**
 * @default "sm"
 */
offset: "xs" | "sm" | "md" | "lg" | "xl"
width: "xs" | "sm" | "md" | "lg" | "xl"
}

type DropdownVariantMap = {
  [key in keyof DropdownVariant]: Array<DropdownVariant[key]>
}

type DropdownSlot = "dropdown" | "trigger" | "content"

export type DropdownVariantProps = {
  [key in keyof DropdownVariant]?: ConditionalValue<DropdownVariant[key]> | undefined
}

export interface DropdownRecipe {
  __slot: DropdownSlot
  __type: DropdownVariantProps
  (props?: DropdownVariantProps): Pretty<Record<DropdownSlot, string>>
  raw: (props?: DropdownVariantProps) => DropdownVariantProps
  variantMap: DropdownVariantMap
  variantKeys: Array<keyof DropdownVariant>
  splitVariantProps<Props extends DropdownVariantProps>(props: Props): [DropdownVariantProps, Pretty<DistributiveOmit<Props, keyof DropdownVariantProps>>]
  getVariantProps: (props?: DropdownVariantProps) => DropdownVariantProps
}


export declare const dropdown: DropdownRecipe