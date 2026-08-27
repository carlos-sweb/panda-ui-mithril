import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const navbarDefaultVariants = {
  "position": "static",
  "color": "base",
  "size": "md",
  "border": false,
  "shadow": "none",
  "glass": false,
  "active": false,
  "disabled": false
}
const navbarCompoundVariants = []

const navbarSlotNames = [
  [
    "navbar",
    "navbar__navbar"
  ],
  [
    "container",
    "navbar__container"
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
  ],
  [
    "brand",
    "navbar__brand"
  ],
  [
    "menu",
    "navbar__menu"
  ],
  [
    "link",
    "navbar__link"
  ],
  [
    "toggle",
    "navbar__toggle"
  ]
]
const navbarSlotFns = /* @__PURE__ */ navbarSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, navbarDefaultVariants, getSlotCompoundVariant(navbarCompoundVariants, slotName))])

const navbarFn = memo((props = {}) => {
  return Object.fromEntries(navbarSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const navbarVariantKeys = [
  "position",
  "color",
  "size",
  "border",
  "shadow",
  "glass",
  "active",
  "disabled"
]
const getVariantProps = (variants) => ({ ...navbarDefaultVariants, ...compact(variants) })

export const navbar = /* @__PURE__ */ Object.assign(navbarFn, {
  __recipe__: false,
  __name__: 'navbar',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: navbarVariantKeys,
  variantMap: {
  "position": [
    "static",
    "sticky",
    "fixed"
  ],
  "color": [
    "base",
    "neutral",
    "primary",
    "secondary",
    "accent",
    "info",
    "success",
    "warning",
    "error"
  ],
  "size": [
    "sm",
    "md",
    "lg"
  ],
  "border": [
    "true",
    "false"
  ],
  "shadow": [
    "none",
    "sm",
    "md",
    "lg"
  ],
  "glass": [
    "true",
    "false"
  ],
  "active": [
    "true",
    "false"
  ],
  "disabled": [
    "true",
    "false"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, navbarVariantKeys)
  },
  getVariantProps
})