/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface StepsVariant {
  /**
 * @default "horizontal"
 */
direction: "horizontal" | "vertical"
color: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
}

type StepsVariantMap = {
  [key in keyof StepsVariant]: Array<StepsVariant[key]>
}

type StepsSlot = "steps" | "step"

export type StepsVariantProps = {
  [key in keyof StepsVariant]?: ConditionalValue<StepsVariant[key]> | undefined
}

export interface StepsRecipe {
  __slot: StepsSlot
  __type: StepsVariantProps
  (props?: StepsVariantProps): Pretty<Record<StepsSlot, string>>
  raw: (props?: StepsVariantProps) => StepsVariantProps
  variantMap: StepsVariantMap
  variantKeys: Array<keyof StepsVariant>
  splitVariantProps<Props extends StepsVariantProps>(props: Props): [StepsVariantProps, Pretty<DistributiveOmit<Props, keyof StepsVariantProps>>]
  getVariantProps: (props?: StepsVariantProps) => StepsVariantProps
}


export declare const steps: StepsRecipe