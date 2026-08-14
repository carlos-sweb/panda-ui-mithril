import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const diffDefaultVariants = {}
const diffCompoundVariants = []

const diffSlotNames = [
  [
    "diff",
    "diff__diff"
  ],
  [
    "item",
    "diff__item"
  ],
  [
    "resizer",
    "diff__resizer"
  ]
]
const diffSlotFns = /* @__PURE__ */ diffSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, diffDefaultVariants, getSlotCompoundVariant(diffCompoundVariants, slotName))])

const diffFn = memo((props = {}) => {
  return Object.fromEntries(diffSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const diffVariantKeys = [
  "item"
]
const getVariantProps = (variants) => ({ ...diffDefaultVariants, ...compact(variants) })

export const diff = /* @__PURE__ */ Object.assign(diffFn, {
  __recipe__: false,
  __name__: 'diff',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: diffVariantKeys,
  variantMap: {
  "item": [
    "1",
    "2"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, diffVariantKeys)
  },
  getVariantProps
})