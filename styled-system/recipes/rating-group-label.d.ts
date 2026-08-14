/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface RatingGroupLabelVariant {
  
}

type RatingGroupLabelVariantMap = {
  [key in keyof RatingGroupLabelVariant]: Array<RatingGroupLabelVariant[key]>
}



export type RatingGroupLabelVariantProps = {
  [key in keyof RatingGroupLabelVariant]?: ConditionalValue<RatingGroupLabelVariant[key]> | undefined
}

export interface RatingGroupLabelRecipe {
  
  __type: RatingGroupLabelVariantProps
  (props?: RatingGroupLabelVariantProps): string
  raw: (props?: RatingGroupLabelVariantProps) => RatingGroupLabelVariantProps
  variantMap: RatingGroupLabelVariantMap
  variantKeys: Array<keyof RatingGroupLabelVariant>
  splitVariantProps<Props extends RatingGroupLabelVariantProps>(props: Props): [RatingGroupLabelVariantProps, Pretty<DistributiveOmit<Props, keyof RatingGroupLabelVariantProps>>]
  getVariantProps: (props?: RatingGroupLabelVariantProps) => RatingGroupLabelVariantProps
}


export declare const ratingGroupLabel: RatingGroupLabelRecipe