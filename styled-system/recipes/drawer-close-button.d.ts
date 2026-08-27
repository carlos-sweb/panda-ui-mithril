/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface DrawerCloseButtonVariant {
  
}

type DrawerCloseButtonVariantMap = {
  [key in keyof DrawerCloseButtonVariant]: Array<DrawerCloseButtonVariant[key]>
}



export type DrawerCloseButtonVariantProps = {
  [key in keyof DrawerCloseButtonVariant]?: ConditionalValue<DrawerCloseButtonVariant[key]> | undefined
}

export interface DrawerCloseButtonRecipe {
  
  __type: DrawerCloseButtonVariantProps
  (props?: DrawerCloseButtonVariantProps): string
  raw: (props?: DrawerCloseButtonVariantProps) => DrawerCloseButtonVariantProps
  variantMap: DrawerCloseButtonVariantMap
  variantKeys: Array<keyof DrawerCloseButtonVariant>
  splitVariantProps<Props extends DrawerCloseButtonVariantProps>(props: Props): [DrawerCloseButtonVariantProps, Pretty<DistributiveOmit<Props, keyof DrawerCloseButtonVariantProps>>]
  getVariantProps: (props?: DrawerCloseButtonVariantProps) => DrawerCloseButtonVariantProps
}


export declare const drawerCloseButton: DrawerCloseButtonRecipe