/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TableOverflowVariant {
  
}

type TableOverflowVariantMap = {
  [key in keyof TableOverflowVariant]: Array<TableOverflowVariant[key]>
}



export type TableOverflowVariantProps = {
  [key in keyof TableOverflowVariant]?: ConditionalValue<TableOverflowVariant[key]> | undefined
}

export interface TableOverflowRecipe {
  
  __type: TableOverflowVariantProps
  (props?: TableOverflowVariantProps): string
  raw: (props?: TableOverflowVariantProps) => TableOverflowVariantProps
  variantMap: TableOverflowVariantMap
  variantKeys: Array<keyof TableOverflowVariant>
  splitVariantProps<Props extends TableOverflowVariantProps>(props: Props): [TableOverflowVariantProps, Pretty<DistributiveOmit<Props, keyof TableOverflowVariantProps>>]
  getVariantProps: (props?: TableOverflowVariantProps) => TableOverflowVariantProps
}


export declare const tableOverflow: TableOverflowRecipe