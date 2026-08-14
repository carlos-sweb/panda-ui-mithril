/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface GridPUMVariant {
  /**
 * @default "1"
 */
cols: "1" | "2" | "3" | "4" | "6" | "12"
/**
 * @default "md"
 */
gap: "sm" | "md" | "lg"
span: "1" | "2" | "3" | "4" | "6" | "12"
}

type GridPUMVariantMap = {
  [key in keyof GridPUMVariant]: Array<GridPUMVariant[key]>
}

type GridPUMSlot = "root" | "cell"

export type GridPUMVariantProps = {
  [key in keyof GridPUMVariant]?: ConditionalValue<GridPUMVariant[key]> | undefined
}

export interface GridPUMRecipe {
  __slot: GridPUMSlot
  __type: GridPUMVariantProps
  (props?: GridPUMVariantProps): Pretty<Record<GridPUMSlot, string>>
  raw: (props?: GridPUMVariantProps) => GridPUMVariantProps
  variantMap: GridPUMVariantMap
  variantKeys: Array<keyof GridPUMVariant>
  splitVariantProps<Props extends GridPUMVariantProps>(props: Props): [GridPUMVariantProps, Pretty<DistributiveOmit<Props, keyof GridPUMVariantProps>>]
  getVariantProps: (props?: GridPUMVariantProps) => GridPUMVariantProps
}


export declare const gridPUM: GridPUMRecipe