/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface DividerPUMVariant {
  color: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
direction: "horizontal" | "vertical"
placement: "start" | "end"
}

type DividerPUMVariantMap = {
  [key in keyof DividerPUMVariant]: Array<DividerPUMVariant[key]>
}



export type DividerPUMVariantProps = {
  [key in keyof DividerPUMVariant]?: ConditionalValue<DividerPUMVariant[key]> | undefined
}

export interface DividerPUMRecipe {
  
  __type: DividerPUMVariantProps
  (props?: DividerPUMVariantProps): string
  raw: (props?: DividerPUMVariantProps) => DividerPUMVariantProps
  variantMap: DividerPUMVariantMap
  variantKeys: Array<keyof DividerPUMVariant>
  splitVariantProps<Props extends DividerPUMVariantProps>(props: Props): [DividerPUMVariantProps, Pretty<DistributiveOmit<Props, keyof DividerPUMVariantProps>>]
  getVariantProps: (props?: DividerPUMVariantProps) => DividerPUMVariantProps
}


export declare const dividerPUM: DividerPUMRecipe