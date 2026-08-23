import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const dropdownDefaultVariants = {
  "placement": "bottom-start",
  "offset": "sm"
}
const dropdownCompoundVariants = []

const dropdownSlotNames = [
  [
    "dropdown",
    "dropdown__dropdown"
  ],
  [
    "trigger",
    "dropdown__trigger"
  ],
  [
    "content",
    "dropdown__content"
  ]
]
const dropdownSlotFns = /* @__PURE__ */ dropdownSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, dropdownDefaultVariants, getSlotCompoundVariant(dropdownCompoundVariants, slotName))])

const dropdownFn = memo((props = {}) => {
  return Object.fromEntries(dropdownSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const dropdownVariantKeys = [
  "placement",
  "open",
  "offset",
  "width"
]
const getVariantProps = (variants) => ({ ...dropdownDefaultVariants, ...compact(variants) })

export const dropdown = /* @__PURE__ */ Object.assign(dropdownFn, {
  __recipe__: false,
  __name__: 'dropdown',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: dropdownVariantKeys,
  variantMap: {
  "placement": [
    "bottom-start",
    "bottom-center",
    "bottom-end",
    "top-start",
    "top-center",
    "top-end",
    "left-start",
    "left-center",
    "left-end",
    "right-start",
    "right-center",
    "right-end"
  ],
  "open": [
    "true"
  ],
  "offset": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  "width": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, dropdownVariantKeys)
  },
  getVariantProps
})