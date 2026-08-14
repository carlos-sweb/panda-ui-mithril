/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface BlockVariant {
  /**
 * @default "md"
 */
spacing: "sm" | "md" | "lg"
}

type BlockVariantMap = {
  [key in keyof BlockVariant]: Array<BlockVariant[key]>
}



export type BlockVariantProps = {
  [key in keyof BlockVariant]?: ConditionalValue<BlockVariant[key]> | undefined
}

export interface BlockRecipe {
  
  __type: BlockVariantProps
  (props?: BlockVariantProps): string
  raw: (props?: BlockVariantProps) => BlockVariantProps
  variantMap: BlockVariantMap
  variantKeys: Array<keyof BlockVariant>
  splitVariantProps<Props extends BlockVariantProps>(props: Props): [BlockVariantProps, Pretty<DistributiveOmit<Props, keyof BlockVariantProps>>]
  getVariantProps: (props?: BlockVariantProps) => BlockVariantProps
}


export declare const block: BlockRecipe