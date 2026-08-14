/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface FieldsetLegendVariant {
  
}

type FieldsetLegendVariantMap = {
  [key in keyof FieldsetLegendVariant]: Array<FieldsetLegendVariant[key]>
}



export type FieldsetLegendVariantProps = {
  [key in keyof FieldsetLegendVariant]?: ConditionalValue<FieldsetLegendVariant[key]> | undefined
}

export interface FieldsetLegendRecipe {
  
  __type: FieldsetLegendVariantProps
  (props?: FieldsetLegendVariantProps): string
  raw: (props?: FieldsetLegendVariantProps) => FieldsetLegendVariantProps
  variantMap: FieldsetLegendVariantMap
  variantKeys: Array<keyof FieldsetLegendVariant>
  splitVariantProps<Props extends FieldsetLegendVariantProps>(props: Props): [FieldsetLegendVariantProps, Pretty<DistributiveOmit<Props, keyof FieldsetLegendVariantProps>>]
  getVariantProps: (props?: FieldsetLegendVariantProps) => FieldsetLegendVariantProps
}


export declare const fieldsetLegend: FieldsetLegendRecipe