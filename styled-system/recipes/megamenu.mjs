import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const megamenuDefaultVariants = {
  "size": "md"
}
const megamenuCompoundVariants = []

const megamenuSlotNames = [
  [
    "megamenu",
    "megamenu__megamenu"
  ],
  [
    "item",
    "megamenu__item"
  ],
  [
    "trigger",
    "megamenu__trigger"
  ],
  [
    "panel",
    "megamenu__panel"
  ],
  [
    "active",
    "megamenu__active"
  ]
]
const megamenuSlotFns = /* @__PURE__ */ megamenuSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, megamenuDefaultVariants, getSlotCompoundVariant(megamenuCompoundVariants, slotName))])

const megamenuFn = memo((props = {}) => {
  return Object.fromEntries(megamenuSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const megamenuVariantKeys = [
  "size",
  "vertical",
  "active",
  "chevron"
]
const getVariantProps = (variants) => ({ ...megamenuDefaultVariants, ...compact(variants) })

export const megamenu = /* @__PURE__ */ Object.assign(megamenuFn, {
  __recipe__: false,
  __name__: 'megamenu',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: megamenuVariantKeys,
  variantMap: {
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  "vertical": [
    "true"
  ],
  "active": [
    "true"
  ],
  "chevron": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, megamenuVariantKeys)
  },
  getVariantProps
})