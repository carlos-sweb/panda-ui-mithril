/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface DiffVariant {
  item: "1" | "2"
}

type DiffVariantMap = {
  [key in keyof DiffVariant]: Array<DiffVariant[key]>
}

type DiffSlot = "diff" | "item" | "resizer"

export type DiffVariantProps = {
  [key in keyof DiffVariant]?: ConditionalValue<DiffVariant[key]> | undefined
}

export interface DiffRecipe {
  __slot: DiffSlot
  __type: DiffVariantProps
  (props?: DiffVariantProps): Pretty<Record<DiffSlot, string>>
  raw: (props?: DiffVariantProps) => DiffVariantProps
  variantMap: DiffVariantMap
  variantKeys: Array<keyof DiffVariant>
  splitVariantProps<Props extends DiffVariantProps>(props: Props): [DiffVariantProps, Pretty<DistributiveOmit<Props, keyof DiffVariantProps>>]
  getVariantProps: (props?: DiffVariantProps) => DiffVariantProps
}


export declare const diff: DiffRecipe