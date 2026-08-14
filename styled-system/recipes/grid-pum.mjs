import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const gridPUMDefaultVariants = {
  "cols": "1",
  "gap": "md"
}
const gridPUMCompoundVariants = []

const gridPUMSlotNames = [
  [
    "root",
    "grid__root"
  ],
  [
    "cell",
    "grid__cell"
  ]
]
const gridPUMSlotFns = /* @__PURE__ */ gridPUMSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, gridPUMDefaultVariants, getSlotCompoundVariant(gridPUMCompoundVariants, slotName))])

const gridPUMFn = memo((props = {}) => {
  return Object.fromEntries(gridPUMSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const gridPUMVariantKeys = [
  "cols",
  "gap",
  "span"
]
const getVariantProps = (variants) => ({ ...gridPUMDefaultVariants, ...compact(variants) })

export const gridPUM = /* @__PURE__ */ Object.assign(gridPUMFn, {
  __recipe__: false,
  __name__: 'gridPUM',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: gridPUMVariantKeys,
  variantMap: {
  "cols": [
    "1",
    "2",
    "3",
    "4",
    "6",
    "12"
  ],
  "gap": [
    "sm",
    "md",
    "lg"
  ],
  "span": [
    "1",
    "2",
    "3",
    "4",
    "6",
    "12"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, gridPUMVariantKeys)
  },
  getVariantProps
})