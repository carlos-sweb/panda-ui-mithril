import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const ratingDefaultVariants = {
  "size": "md",
  "color": "warning",
  "readonly": false
}
const ratingCompoundVariants = []

const ratingSlotNames = [
  [
    "root",
    "rating__root"
  ],
  [
    "star",
    "rating__star"
  ]
]
const ratingSlotFns = /* @__PURE__ */ ratingSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, ratingDefaultVariants, getSlotCompoundVariant(ratingCompoundVariants, slotName))])

const ratingFn = memo((props = {}) => {
  return Object.fromEntries(ratingSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const ratingVariantKeys = [
  "size",
  "color",
  "state",
  "readonly"
]
const getVariantProps = (variants) => ({ ...ratingDefaultVariants, ...compact(variants) })

export const rating = /* @__PURE__ */ Object.assign(ratingFn, {
  __recipe__: false,
  __name__: 'rating',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: ratingVariantKeys,
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
  "state": [
    "empty",
    "full"
  ],
  "readonly": [
    "true",
    "false"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, ratingVariantKeys)
  },
  getVariantProps
})