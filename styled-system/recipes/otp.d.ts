/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface OtpVariant {
  /**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
/**
 * @default "primary"
 */
color: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
joined: boolean
error: boolean
}

type OtpVariantMap = {
  [key in keyof OtpVariant]: Array<OtpVariant[key]>
}

type OtpSlot = "root" | "input" | "separator"

export type OtpVariantProps = {
  [key in keyof OtpVariant]?: ConditionalValue<OtpVariant[key]> | undefined
}

export interface OtpRecipe {
  __slot: OtpSlot
  __type: OtpVariantProps
  (props?: OtpVariantProps): Pretty<Record<OtpSlot, string>>
  raw: (props?: OtpVariantProps) => OtpVariantProps
  variantMap: OtpVariantMap
  variantKeys: Array<keyof OtpVariant>
  splitVariantProps<Props extends OtpVariantProps>(props: Props): [OtpVariantProps, Pretty<DistributiveOmit<Props, keyof OtpVariantProps>>]
  getVariantProps: (props?: OtpVariantProps) => OtpVariantProps
}


export declare const otp: OtpRecipe