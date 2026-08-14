import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tabsDefaultVariants = {
  "size": "md"
}
const tabsCompoundVariants = []

const tabsSlotNames = [
  [
    "tabs",
    "tabs__tabs"
  ],
  [
    "tab",
    "tabs__tab"
  ],
  [
    "content",
    "tabs__content"
  ]
]
const tabsSlotFns = /* @__PURE__ */ tabsSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, tabsDefaultVariants, getSlotCompoundVariant(tabsCompoundVariants, slotName))])

const tabsFn = memo((props = {}) => {
  return Object.fromEntries(tabsSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const tabsVariantKeys = [
  "variant",
  "size",
  "active"
]
const getVariantProps = (variants) => ({ ...tabsDefaultVariants, ...compact(variants) })

export const tabs = /* @__PURE__ */ Object.assign(tabsFn, {
  __recipe__: false,
  __name__: 'tabs',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: tabsVariantKeys,
  variantMap: {
  "variant": [
    "box",
    "border",
    "lift"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  "active": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, tabsVariantKeys)
  },
  getVariantProps
})