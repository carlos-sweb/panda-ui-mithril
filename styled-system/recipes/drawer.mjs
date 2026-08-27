import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const drawerDefaultVariants = {}
const drawerCompoundVariants = []

const drawerSlotNames = [
  [
    "drawer",
    "drawer__drawer"
  ],
  [
    "box",
    "drawer__box"
  ],
  [
    "action",
    "drawer__action"
  ],
  [
    "backdrop",
    "drawer__backdrop"
  ],
  [
    "header",
    "drawer__header"
  ],
  [
    "body",
    "drawer__body"
  ],
  [
    "footer",
    "drawer__footer"
  ]
]
const drawerSlotFns = /* @__PURE__ */ drawerSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, drawerDefaultVariants, getSlotCompoundVariant(drawerCompoundVariants, slotName))])

const drawerFn = memo((props = {}) => {
  return Object.fromEntries(drawerSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const drawerVariantKeys = [
  "position",
  "size"
]
const getVariantProps = (variants) => ({ ...drawerDefaultVariants, ...compact(variants) })

export const drawer = /* @__PURE__ */ Object.assign(drawerFn, {
  __recipe__: false,
  __name__: 'drawer',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: drawerVariantKeys,
  variantMap: {
  "position": [
    "top",
    "bottom",
    "start",
    "end"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "full"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, drawerVariantKeys)
  },
  getVariantProps
})