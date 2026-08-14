import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const stepsDefaultVariants = {
  "direction": "horizontal"
}
const stepsCompoundVariants = []

const stepsSlotNames = [
  [
    "steps",
    "steps__steps"
  ],
  [
    "step",
    "steps__step"
  ]
]
const stepsSlotFns = /* @__PURE__ */ stepsSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, stepsDefaultVariants, getSlotCompoundVariant(stepsCompoundVariants, slotName))])

const stepsFn = memo((props = {}) => {
  return Object.fromEntries(stepsSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const stepsVariantKeys = [
  "direction",
  "color"
]
const getVariantProps = (variants) => ({ ...stepsDefaultVariants, ...compact(variants) })

export const steps = /* @__PURE__ */ Object.assign(stepsFn, {
  __recipe__: false,
  __name__: 'steps',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: stepsVariantKeys,
  variantMap: {
  "direction": [
    "horizontal",
    "vertical"
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
  ]
},
  splitVariantProps(props) {
    return splitProps(props, stepsVariantKeys)
  },
  getVariantProps
})