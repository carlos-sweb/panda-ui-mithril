/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CarouselItemVariant {
  
}

type CarouselItemVariantMap = {
  [key in keyof CarouselItemVariant]: Array<CarouselItemVariant[key]>
}



export type CarouselItemVariantProps = {
  [key in keyof CarouselItemVariant]?: ConditionalValue<CarouselItemVariant[key]> | undefined
}

export interface CarouselItemRecipe {
  
  __type: CarouselItemVariantProps
  (props?: CarouselItemVariantProps): string
  raw: (props?: CarouselItemVariantProps) => CarouselItemVariantProps
  variantMap: CarouselItemVariantMap
  variantKeys: Array<keyof CarouselItemVariant>
  splitVariantProps<Props extends CarouselItemVariantProps>(props: Props): [CarouselItemVariantProps, Pretty<DistributiveOmit<Props, keyof CarouselItemVariantProps>>]
  getVariantProps: (props?: CarouselItemVariantProps) => CarouselItemVariantProps
}


export declare const carouselItem: CarouselItemRecipe