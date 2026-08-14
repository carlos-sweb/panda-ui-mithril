import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const statDefaultVariants = {
  "direction": "horizontal"
}
const statCompoundVariants = []

const statSlotNames = [
  [
    "stats",
    "stat__stats"
  ],
  [
    "stat",
    "stat__stat"
  ],
  [
    "title",
    "stat__title"
  ],
  [
    "value",
    "stat__value"
  ],
  [
    "desc",
    "stat__desc"
  ],
  [
    "figure",
    "stat__figure"
  ],
  [
    "actions",
    "stat__actions"
  ]
]
const statSlotFns = /* @__PURE__ */ statSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, statDefaultVariants, getSlotCompoundVariant(statCompoundVariants, slotName))])

const statFn = memo((props = {}) => {
  return Object.fromEntries(statSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const statVariantKeys = [
  "direction"
]
const getVariantProps = (variants) => ({ ...statDefaultVariants, ...compact(variants) })

export const stat = /* @__PURE__ */ Object.assign(statFn, {
  __recipe__: false,
  __name__: 'stat',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: statVariantKeys,
  variantMap: {
  "direction": [
    "horizontal",
    "vertical"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, statVariantKeys)
  },
  getVariantProps
})