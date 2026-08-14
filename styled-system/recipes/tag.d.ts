/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TagVariant {
  /**
 * @default "default"
 */
variant: "default" | "outline" | "dash" | "soft" | "ghost" | "info" | "success" | "warning" | "error"
/**
 * @default "md"
 */
size: "md" | "lg"
clickable: boolean
disabled: boolean
square: boolean
}

type TagVariantMap = {
  [key in keyof TagVariant]: Array<TagVariant[key]>
}



export type TagVariantProps = {
  [key in keyof TagVariant]?: ConditionalValue<TagVariant[key]> | undefined
}

export interface TagRecipe {
  
  __type: TagVariantProps
  (props?: TagVariantProps): string
  raw: (props?: TagVariantProps) => TagVariantProps
  variantMap: TagVariantMap
  variantKeys: Array<keyof TagVariant>
  splitVariantProps<Props extends TagVariantProps>(props: Props): [TagVariantProps, Pretty<DistributiveOmit<Props, keyof TagVariantProps>>]
  getVariantProps: (props?: TagVariantProps) => TagVariantProps
}


export declare const tag: TagRecipe