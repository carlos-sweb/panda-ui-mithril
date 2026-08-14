import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const timelineDefaultVariants = {
  "direction": "horizontal"
}
const timelineCompoundVariants = []

const timelineSlotNames = [
  [
    "timeline",
    "timeline__timeline"
  ],
  [
    "box",
    "timeline__box"
  ]
]
const timelineSlotFns = /* @__PURE__ */ timelineSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, timelineDefaultVariants, getSlotCompoundVariant(timelineCompoundVariants, slotName))])

const timelineFn = memo((props = {}) => {
  return Object.fromEntries(timelineSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const timelineVariantKeys = [
  "direction",
  "snapIcon"
]
const getVariantProps = (variants) => ({ ...timelineDefaultVariants, ...compact(variants) })

export const timeline = /* @__PURE__ */ Object.assign(timelineFn, {
  __recipe__: false,
  __name__: 'timeline',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: timelineVariantKeys,
  variantMap: {
  "direction": [
    "horizontal",
    "vertical"
  ],
  "snapIcon": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, timelineVariantKeys)
  },
  getVariantProps
})