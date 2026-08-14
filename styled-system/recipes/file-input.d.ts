/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface FileInputVariant {
  color: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
/**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
ghost: boolean
}

type FileInputVariantMap = {
  [key in keyof FileInputVariant]: Array<FileInputVariant[key]>
}



export type FileInputVariantProps = {
  [key in keyof FileInputVariant]?: ConditionalValue<FileInputVariant[key]> | undefined
}

export interface FileInputRecipe {
  
  __type: FileInputVariantProps
  (props?: FileInputVariantProps): string
  raw: (props?: FileInputVariantProps) => FileInputVariantProps
  variantMap: FileInputVariantMap
  variantKeys: Array<keyof FileInputVariant>
  splitVariantProps<Props extends FileInputVariantProps>(props: Props): [FileInputVariantProps, Pretty<DistributiveOmit<Props, keyof FileInputVariantProps>>]
  getVariantProps: (props?: FileInputVariantProps) => FileInputVariantProps
}


export declare const fileInput: FileInputRecipe