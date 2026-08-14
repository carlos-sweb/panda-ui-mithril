/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ModalVariant {
  position: "top" | "middle" | "bottom" | "start" | "end"
size: "xs" | "sm" | "md" | "lg"
}

type ModalVariantMap = {
  [key in keyof ModalVariant]: Array<ModalVariant[key]>
}

type ModalSlot = "modal" | "box" | "action" | "backdrop" | "header" | "body" | "footer"

export type ModalVariantProps = {
  [key in keyof ModalVariant]?: ConditionalValue<ModalVariant[key]> | undefined
}

export interface ModalRecipe {
  __slot: ModalSlot
  __type: ModalVariantProps
  (props?: ModalVariantProps): Pretty<Record<ModalSlot, string>>
  raw: (props?: ModalVariantProps) => ModalVariantProps
  variantMap: ModalVariantMap
  variantKeys: Array<keyof ModalVariant>
  splitVariantProps<Props extends ModalVariantProps>(props: Props): [ModalVariantProps, Pretty<DistributiveOmit<Props, keyof ModalVariantProps>>]
  getVariantProps: (props?: ModalVariantProps) => ModalVariantProps
}


export declare const modal: ModalRecipe