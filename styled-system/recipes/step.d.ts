/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface StepVariant {
  /**
 * @default "horizontal"
 */
direction: "horizontal" | "vertical"
color: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
}

type StepVariantMap = {
  [key in keyof StepVariant]: Array<StepVariant[key]>
}

type StepSlot = "steps" | "step"

export type StepVariantProps = {
  [key in keyof StepVariant]?: ConditionalValue<StepVariant[key]> | undefined
}

export interface StepRecipe {
  __slot: StepSlot
  __type: StepVariantProps
  (props?: StepVariantProps): Pretty<Record<StepSlot, string>>
  raw: (props?: StepVariantProps) => StepVariantProps
  variantMap: StepVariantMap
  variantKeys: Array<keyof StepVariant>
  splitVariantProps<Props extends StepVariantProps>(props: Props): [StepVariantProps, Pretty<DistributiveOmit<Props, keyof StepVariantProps>>]
  getVariantProps: (props?: StepVariantProps) => StepVariantProps
}


export declare const step: StepRecipe