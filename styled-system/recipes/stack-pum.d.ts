/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface StackPUMVariant {
  /**
 * @default "column"
 */
direction: "column" | "row"
/**
 * @default "md"
 */
gap: "xs" | "sm" | "md" | "lg" | "xl"
/**
 * @default "stretch"
 */
align: "start" | "center" | "end" | "stretch"
justify: "start" | "center" | "end" | "between" | "around"
}

type StackPUMVariantMap = {
  [key in keyof StackPUMVariant]: Array<StackPUMVariant[key]>
}



export type StackPUMVariantProps = {
  [key in keyof StackPUMVariant]?: ConditionalValue<StackPUMVariant[key]> | undefined
}

export interface StackPUMRecipe {
  
  __type: StackPUMVariantProps
  (props?: StackPUMVariantProps): string
  raw: (props?: StackPUMVariantProps) => StackPUMVariantProps
  variantMap: StackPUMVariantMap
  variantKeys: Array<keyof StackPUMVariant>
  splitVariantProps<Props extends StackPUMVariantProps>(props: Props): [StackPUMVariantProps, Pretty<DistributiveOmit<Props, keyof StackPUMVariantProps>>]
  getVariantProps: (props?: StackPUMVariantProps) => StackPUMVariantProps
}


export declare const stackPUM: StackPUMRecipe