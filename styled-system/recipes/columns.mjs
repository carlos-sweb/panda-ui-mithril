import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const columnsDefaultVariants = {
  "gap": "md"
}
const columnsCompoundVariants = []

const columnsSlotNames = [
  [
    "root",
    "columns__root"
  ],
  [
    "column",
    "columns__column"
  ]
]
const columnsSlotFns = /* @__PURE__ */ columnsSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, columnsDefaultVariants, getSlotCompoundVariant(columnsCompoundVariants, slotName))])

const columnsFn = memo((props = {}) => {
  return Object.fromEntries(columnsSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const columnsVariantKeys = [
  "gap",
  "vertical",
  "centered",
  "width",
  "narrow"
]
const getVariantProps = (variants) => ({ ...columnsDefaultVariants, ...compact(variants) })

export const columns = /* @__PURE__ */ Object.assign(columnsFn, {
  __recipe__: false,
  __name__: 'columns',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: columnsVariantKeys,
  variantMap: {
  "gap": [
    "sm",
    "md",
    "lg"
  ],
  "vertical": [
    "true"
  ],
  "centered": [
    "true"
  ],
  "width": [
    "1",
    "2",
    "3",
    "4",
    "6",
    "8",
    "9",
    "12",
    "auto"
  ],
  "narrow": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, columnsVariantKeys)
  },
  getVariantProps
})