/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface BoxPUMVariant {
  /**
 * @default "md"
 */
padding: "sm" | "md" | "lg"
/**
 * @default "md"
 */
shadow: "sm" | "md" | "lg" | "none"
}

type BoxPUMVariantMap = {
  [key in keyof BoxPUMVariant]: Array<BoxPUMVariant[key]>
}



export type BoxPUMVariantProps = {
  [key in keyof BoxPUMVariant]?: ConditionalValue<BoxPUMVariant[key]> | undefined
}

export interface BoxPUMRecipe {
  
  __type: BoxPUMVariantProps
  (props?: BoxPUMVariantProps): string
  raw: (props?: BoxPUMVariantProps) => BoxPUMVariantProps
  variantMap: BoxPUMVariantMap
  variantKeys: Array<keyof BoxPUMVariant>
  splitVariantProps<Props extends BoxPUMVariantProps>(props: Props): [BoxPUMVariantProps, Pretty<DistributiveOmit<Props, keyof BoxPUMVariantProps>>]
  getVariantProps: (props?: BoxPUMVariantProps) => BoxPUMVariantProps
}


export declare const boxPUM: BoxPUMRecipe