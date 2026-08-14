/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface BreadcrumbsVariant {
  
}

type BreadcrumbsVariantMap = {
  [key in keyof BreadcrumbsVariant]: Array<BreadcrumbsVariant[key]>
}



export type BreadcrumbsVariantProps = {
  [key in keyof BreadcrumbsVariant]?: ConditionalValue<BreadcrumbsVariant[key]> | undefined
}

export interface BreadcrumbsRecipe {
  
  __type: BreadcrumbsVariantProps
  (props?: BreadcrumbsVariantProps): string
  raw: (props?: BreadcrumbsVariantProps) => BreadcrumbsVariantProps
  variantMap: BreadcrumbsVariantMap
  variantKeys: Array<keyof BreadcrumbsVariant>
  splitVariantProps<Props extends BreadcrumbsVariantProps>(props: Props): [BreadcrumbsVariantProps, Pretty<DistributiveOmit<Props, keyof BreadcrumbsVariantProps>>]
  getVariantProps: (props?: BreadcrumbsVariantProps) => BreadcrumbsVariantProps
}


export declare const breadcrumbs: BreadcrumbsRecipe