/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ContainerPUMVariant {
  /**
 * @default "fullhd"
 */
maxWidth: "fullhd" | "widescreen" | "desktop" | "tablet"
fluid: boolean
}

type ContainerPUMVariantMap = {
  [key in keyof ContainerPUMVariant]: Array<ContainerPUMVariant[key]>
}



export type ContainerPUMVariantProps = {
  [key in keyof ContainerPUMVariant]?: ConditionalValue<ContainerPUMVariant[key]> | undefined
}

export interface ContainerPUMRecipe {
  
  __type: ContainerPUMVariantProps
  (props?: ContainerPUMVariantProps): string
  raw: (props?: ContainerPUMVariantProps) => ContainerPUMVariantProps
  variantMap: ContainerPUMVariantMap
  variantKeys: Array<keyof ContainerPUMVariant>
  splitVariantProps<Props extends ContainerPUMVariantProps>(props: Props): [ContainerPUMVariantProps, Pretty<DistributiveOmit<Props, keyof ContainerPUMVariantProps>>]
  getVariantProps: (props?: ContainerPUMVariantProps) => ContainerPUMVariantProps
}


export declare const containerPUM: ContainerPUMRecipe