import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const stepDefaultVariants = {
  "direction": "horizontal"
}
const stepCompoundVariants = []

const stepSlotNames = [
  [
    "steps",
    "steps__steps"
  ],
  [
    "step",
    "steps__step"
  ]
]
const stepSlotFns = /* @__PURE__ */ stepSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, stepDefaultVariants, getSlotCompoundVariant(stepCompoundVariants, slotName))])

const stepFn = memo((props = {}) => {
  return Object.fromEntries(stepSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const stepVariantKeys = [
  "direction",
  "color"
]
const getVariantProps = (variants) => ({ ...stepDefaultVariants, ...compact(variants) })

export const step = /* @__PURE__ */ Object.assign(stepFn, {
  __recipe__: false,
  __name__: 'step',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: stepVariantKeys,
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
    return splitProps(props, stepVariantKeys)
  },
  getVariantProps
})