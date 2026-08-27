import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const otpDefaultVariants = {
  "size": "md",
  "color": "primary"
}
const otpCompoundVariants = []

const otpSlotNames = [
  [
    "root",
    "otp__root"
  ],
  [
    "input",
    "otp__input"
  ],
  [
    "separator",
    "otp__separator"
  ]
]
const otpSlotFns = /* @__PURE__ */ otpSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, otpDefaultVariants, getSlotCompoundVariant(otpCompoundVariants, slotName))])

const otpFn = memo((props = {}) => {
  return Object.fromEntries(otpSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const otpVariantKeys = [
  "size",
  "color",
  "joined",
  "error"
]
const getVariantProps = (variants) => ({ ...otpDefaultVariants, ...compact(variants) })

export const otp = /* @__PURE__ */ Object.assign(otpFn, {
  __recipe__: false,
  __name__: 'otp',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: otpVariantKeys,
  variantMap: {
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  "color": [
    "neutral",
    "primary",
    "secondary",
    "accent",
    "info",
    "success",
    "warning",
    "error"
  ],
  "joined": [
    "true"
  ],
  "error": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, otpVariantKeys)
  },
  getVariantProps
})