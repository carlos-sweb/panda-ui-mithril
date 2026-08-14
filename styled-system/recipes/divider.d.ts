/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface DividerVariant {
  color: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
direction: "horizontal" | "vertical"
placement: "start" | "end"
}

type DividerVariantMap = {
  [key in keyof DividerVariant]: Array<DividerVariant[key]>
}



export type DividerVariantProps = {
  [key in keyof DividerVariant]?: ConditionalValue<DividerVariant[key]> | undefined
}

export interface DividerRecipe {
  
  __type: DividerVariantProps
  (props?: DividerVariantProps): string
  raw: (props?: DividerVariantProps) => DividerVariantProps
  variantMap: DividerVariantMap
  variantKeys: Array<keyof DividerVariant>
  splitVariantProps<Props extends DividerVariantProps>(props: Props): [DividerVariantProps, Pretty<DistributiveOmit<Props, keyof DividerVariantProps>>]
  getVariantProps: (props?: DividerVariantProps) => DividerVariantProps
}


export declare const divider: DividerRecipe