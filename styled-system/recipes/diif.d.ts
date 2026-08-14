/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface DiifVariant {
  item: "1" | "2"
}

type DiifVariantMap = {
  [key in keyof DiifVariant]: Array<DiifVariant[key]>
}

type DiifSlot = "diff" | "item" | "resizer"

export type DiifVariantProps = {
  [key in keyof DiifVariant]?: ConditionalValue<DiifVariant[key]> | undefined
}

export interface DiifRecipe {
  __slot: DiifSlot
  __type: DiifVariantProps
  (props?: DiifVariantProps): Pretty<Record<DiifSlot, string>>
  raw: (props?: DiifVariantProps) => DiifVariantProps
  variantMap: DiifVariantMap
  variantKeys: Array<keyof DiifVariant>
  splitVariantProps<Props extends DiifVariantProps>(props: Props): [DiifVariantProps, Pretty<DistributiveOmit<Props, keyof DiifVariantProps>>]
  getVariantProps: (props?: DiifVariantProps) => DiifVariantProps
}


export declare const diif: DiifRecipe