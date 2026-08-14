import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const listDefaultVariants = {}
const listCompoundVariants = []

const listSlotNames = [
  [
    "list",
    "list__list"
  ],
  [
    "row",
    "list__row"
  ],
  [
    "col",
    "list__col"
  ]
]
const listSlotFns = /* @__PURE__ */ listSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, listDefaultVariants, getSlotCompoundVariant(listCompoundVariants, slotName))])

const listFn = memo((props = {}) => {
  return Object.fromEntries(listSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const listVariantKeys = [
  "hover",
  "wrap"
]
const getVariantProps = (variants) => ({ ...listDefaultVariants, ...compact(variants) })

export const list = /* @__PURE__ */ Object.assign(listFn, {
  __recipe__: false,
  __name__: 'list',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: listVariantKeys,
  variantMap: {
  "hover": [
    "true"
  ],
  "wrap": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, listVariantKeys)
  },
  getVariantProps
})