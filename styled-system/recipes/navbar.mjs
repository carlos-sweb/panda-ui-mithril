import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const navbarDefaultVariants = {}
const navbarCompoundVariants = []

const navbarSlotNames = [
  [
    "navbar",
    "navbar__navbar"
  ],
  [
    "start",
    "navbar__start"
  ],
  [
    "center",
    "navbar__center"
  ],
  [
    "end",
    "navbar__end"
  ]
]
const navbarSlotFns = /* @__PURE__ */ navbarSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, navbarDefaultVariants, getSlotCompoundVariant(navbarCompoundVariants, slotName))])

const navbarFn = memo((props = {}) => {
  return Object.fromEntries(navbarSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const navbarVariantKeys = []
const getVariantProps = (variants) => ({ ...navbarDefaultVariants, ...compact(variants) })

export const navbar = /* @__PURE__ */ Object.assign(navbarFn, {
  __recipe__: false,
  __name__: 'navbar',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: navbarVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, navbarVariantKeys)
  },
  getVariantProps
})