import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const avatarDefaultVariants = {
  "size": "md",
  "shape": "circle"
}
const avatarCompoundVariants = []

const avatarSlotNames = [
  [
    "avatar",
    "avatar__avatar"
  ],
  [
    "group",
    "avatar__group"
  ]
]
const avatarSlotFns = /* @__PURE__ */ avatarSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, avatarDefaultVariants, getSlotCompoundVariant(avatarCompoundVariants, slotName))])

const avatarFn = memo((props = {}) => {
  return Object.fromEntries(avatarSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const avatarVariantKeys = [
  "size",
  "shape",
  "placeholder",
  "status"
]
const getVariantProps = (variants) => ({ ...avatarDefaultVariants, ...compact(variants) })

export const avatar = /* @__PURE__ */ Object.assign(avatarFn, {
  __recipe__: false,
  __name__: 'avatar',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: avatarVariantKeys,
  variantMap: {
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  "shape": [
    "circle",
    "square"
  ],
  "placeholder": [
    "true"
  ],
  "status": [
    "online",
    "offline"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, avatarVariantKeys)
  },
  getVariantProps
})