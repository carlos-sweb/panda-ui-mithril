/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ColumnsVariant {
  /**
 * @default "md"
 */
gap: "sm" | "md" | "lg"
vertical: boolean
centered: boolean
width: "1" | "2" | "3" | "4" | "6" | "8" | "9" | "12" | "auto"
narrow: boolean
}

type ColumnsVariantMap = {
  [key in keyof ColumnsVariant]: Array<ColumnsVariant[key]>
}

type ColumnsSlot = "root" | "column"

export type ColumnsVariantProps = {
  [key in keyof ColumnsVariant]?: ConditionalValue<ColumnsVariant[key]> | undefined
}

export interface ColumnsRecipe {
  __slot: ColumnsSlot
  __type: ColumnsVariantProps
  (props?: ColumnsVariantProps): Pretty<Record<ColumnsSlot, string>>
  raw: (props?: ColumnsVariantProps) => ColumnsVariantProps
  variantMap: ColumnsVariantMap
  variantKeys: Array<keyof ColumnsVariant>
  splitVariantProps<Props extends ColumnsVariantProps>(props: Props): [ColumnsVariantProps, Pretty<DistributiveOmit<Props, keyof ColumnsVariantProps>>]
  getVariantProps: (props?: ColumnsVariantProps) => ColumnsVariantProps
}


export declare const columns: ColumnsRecipe