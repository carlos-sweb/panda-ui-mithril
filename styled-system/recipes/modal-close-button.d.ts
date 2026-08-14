/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ModalCloseButtonVariant {
  
}

type ModalCloseButtonVariantMap = {
  [key in keyof ModalCloseButtonVariant]: Array<ModalCloseButtonVariant[key]>
}



export type ModalCloseButtonVariantProps = {
  [key in keyof ModalCloseButtonVariant]?: ConditionalValue<ModalCloseButtonVariant[key]> | undefined
}

export interface ModalCloseButtonRecipe {
  
  __type: ModalCloseButtonVariantProps
  (props?: ModalCloseButtonVariantProps): string
  raw: (props?: ModalCloseButtonVariantProps) => ModalCloseButtonVariantProps
  variantMap: ModalCloseButtonVariantMap
  variantKeys: Array<keyof ModalCloseButtonVariant>
  splitVariantProps<Props extends ModalCloseButtonVariantProps>(props: Props): [ModalCloseButtonVariantProps, Pretty<DistributiveOmit<Props, keyof ModalCloseButtonVariantProps>>]
  getVariantProps: (props?: ModalCloseButtonVariantProps) => ModalCloseButtonVariantProps
}


export declare const modalCloseButton: ModalCloseButtonRecipe