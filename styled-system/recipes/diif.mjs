import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const diifDefaultVariants = {}
const diifCompoundVariants = []

const diifSlotNames = [
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
const diifSlotFns = /* @__PURE__ */ diifSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, diifDefaultVariants, getSlotCompoundVariant(diifCompoundVariants, slotName))])

const diifFn = memo((props = {}) => {
  return Object.fromEntries(diifSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const diifVariantKeys = [
  "item"
]
const getVariantProps = (variants) => ({ ...diifDefaultVariants, ...compact(variants) })

export const diif = /* @__PURE__ */ Object.assign(diifFn, {
  __recipe__: false,
  __name__: 'diif',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: diifVariantKeys,
  variantMap: {
  "item": [
    "1",
    "2"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, diifVariantKeys)
  },
  getVariantProps
})