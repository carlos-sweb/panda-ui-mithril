import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const modalDefaultVariants = {}
const modalCompoundVariants = []

const modalSlotNames = [
  [
    "modal",
    "modal__modal"
  ],
  [
    "box",
    "modal__box"
  ],
  [
    "action",
    "modal__action"
  ],
  [
    "backdrop",
    "modal__backdrop"
  ],
  [
    "header",
    "modal__header"
  ],
  [
    "body",
    "modal__body"
  ],
  [
    "footer",
    "modal__footer"
  ]
]
const modalSlotFns = /* @__PURE__ */ modalSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, modalDefaultVariants, getSlotCompoundVariant(modalCompoundVariants, slotName))])

const modalFn = memo((props = {}) => {
  return Object.fromEntries(modalSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const modalVariantKeys = [
  "position",
  "size"
]
const getVariantProps = (variants) => ({ ...modalDefaultVariants, ...compact(variants) })

export const modal = /* @__PURE__ */ Object.assign(modalFn, {
  __recipe__: false,
  __name__: 'modal',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: modalVariantKeys,
  variantMap: {
  "position": [
    "top",
    "middle",
    "bottom",
    "start",
    "end"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, modalVariantKeys)
  },
  getVariantProps
})