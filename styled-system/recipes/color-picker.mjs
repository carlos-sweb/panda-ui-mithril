import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const colorPickerDefaultVariants = {
  "size": "md"
}
const colorPickerCompoundVariants = []

const colorPickerSlotNames = [
  [
    "root",
    "colorpicker__root"
  ],
  [
    "picker",
    "colorpicker__picker"
  ],
  [
    "gradient",
    "colorpicker__gradient"
  ],
  [
    "cursor",
    "colorpicker__cursor"
  ],
  [
    "sliders",
    "colorpicker__sliders"
  ],
  [
    "sliderRow",
    "colorpicker__sliderRow"
  ],
  [
    "sliderHeader",
    "colorpicker__sliderHeader"
  ],
  [
    "sliderLabel",
    "colorpicker__sliderLabel"
  ],
  [
    "sliderValue",
    "colorpicker__sliderValue"
  ],
  [
    "track",
    "colorpicker__track"
  ],
  [
    "hueTrack",
    "colorpicker__hueTrack"
  ],
  [
    "thumb",
    "colorpicker__thumb"
  ],
  [
    "hexRow",
    "colorpicker__hexRow"
  ],
  [
    "hexInput",
    "colorpicker__hexInput"
  ],
  [
    "swatch",
    "colorpicker__swatch"
  ],
  [
    "footer",
    "colorpicker__footer"
  ],
  [
    "modeButton",
    "colorpicker__modeButton"
  ],
  [
    "copyButton",
    "colorpicker__copyButton"
  ],
  [
    "triggerButton",
    "colorpicker__triggerButton"
  ],
  [
    "triggerSwatch",
    "colorpicker__triggerSwatch"
  ],
  [
    "dropdownPanel",
    "colorpicker__dropdownPanel"
  ],
  [
    "dropdownPanelClose",
    "colorpicker__dropdownPanelClose"
  ],
  [
    "closeButton",
    "colorpicker__closeButton"
  ],
  [
    "closeStart",
    "colorpicker__closeStart"
  ],
  [
    "closeEnd",
    "colorpicker__closeEnd"
  ]
]
const colorPickerSlotFns = /* @__PURE__ */ colorPickerSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, colorPickerDefaultVariants, getSlotCompoundVariant(colorPickerCompoundVariants, slotName))])

const colorPickerFn = memo((props = {}) => {
  return Object.fromEntries(colorPickerSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const colorPickerVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...colorPickerDefaultVariants, ...compact(variants) })

export const colorPicker = /* @__PURE__ */ Object.assign(colorPickerFn, {
  __recipe__: false,
  __name__: 'colorPicker',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: colorPickerVariantKeys,
  variantMap: {
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, colorPickerVariantKeys)
  },
  getVariantProps
})