/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CollapseTitleVariant {
  
}

type CollapseTitleVariantMap = {
  [key in keyof CollapseTitleVariant]: Array<CollapseTitleVariant[key]>
}



export type CollapseTitleVariantProps = {
  [key in keyof CollapseTitleVariant]?: ConditionalValue<CollapseTitleVariant[key]> | undefined
}

export interface CollapseTitleRecipe {
  
  __type: CollapseTitleVariantProps
  (props?: CollapseTitleVariantProps): string
  raw: (props?: CollapseTitleVariantProps) => CollapseTitleVariantProps
  variantMap: CollapseTitleVariantMap
  variantKeys: Array<keyof CollapseTitleVariant>
  splitVariantProps<Props extends CollapseTitleVariantProps>(props: Props): [CollapseTitleVariantProps, Pretty<DistributiveOmit<Props, keyof CollapseTitleVariantProps>>]
  getVariantProps: (props?: CollapseTitleVariantProps) => CollapseTitleVariantProps
}


export declare const collapseTitle: CollapseTitleRecipe