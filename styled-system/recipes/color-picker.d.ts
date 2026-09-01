/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ColorPickerVariant {
  /**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
}

type ColorPickerVariantMap = {
  [key in keyof ColorPickerVariant]: Array<ColorPickerVariant[key]>
}

type ColorPickerSlot = "root" | "picker" | "gradient" | "cursor" | "sliders" | "sliderRow" | "sliderHeader" | "sliderLabel" | "sliderValue" | "track" | "hueTrack" | "thumb" | "hexRow" | "hexInput" | "swatch" | "footer" | "modeButton" | "copyButton" | "triggerButton" | "triggerSwatch" | "dropdownPanel" | "dropdownPanelClose" | "closeButton" | "closeStart" | "closeEnd"

export type ColorPickerVariantProps = {
  [key in keyof ColorPickerVariant]?: ConditionalValue<ColorPickerVariant[key]> | undefined
}

export interface ColorPickerRecipe {
  __slot: ColorPickerSlot
  __type: ColorPickerVariantProps
  (props?: ColorPickerVariantProps): Pretty<Record<ColorPickerSlot, string>>
  raw: (props?: ColorPickerVariantProps) => ColorPickerVariantProps
  variantMap: ColorPickerVariantMap
  variantKeys: Array<keyof ColorPickerVariant>
  splitVariantProps<Props extends ColorPickerVariantProps>(props: Props): [ColorPickerVariantProps, Pretty<DistributiveOmit<Props, keyof ColorPickerVariantProps>>]
  getVariantProps: (props?: ColorPickerVariantProps) => ColorPickerVariantProps
}


export declare const colorPicker: ColorPickerRecipe