import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const cardDefaultVariants = {
  "size": "md"
}
const cardCompoundVariants = []

const cardSlotNames = [
  [
    "card",
    "card__card"
  ],
  [
    "body",
    "card__body"
  ],
  [
    "title",
    "card__title"
  ],
  [
    "actions",
    "card__actions"
  ]
]
const cardSlotFns = /* @__PURE__ */ cardSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, cardDefaultVariants, getSlotCompoundVariant(cardCompoundVariants, slotName))])

const cardFn = memo((props = {}) => {
  return Object.fromEntries(cardSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const cardVariantKeys = [
  "size",
  "border",
  "dash",
  "side",
  "imageFull",
  "justify"
]
const getVariantProps = (variants) => ({ ...cardDefaultVariants, ...compact(variants) })

export const card = /* @__PURE__ */ Object.assign(cardFn, {
  __recipe__: false,
  __name__: 'card',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: cardVariantKeys,
  variantMap: {
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  "border": [
    "true"
  ],
  "dash": [
    "true"
  ],
  "side": [
    "true"
  ],
  "imageFull": [
    "true"
  ],
  "justify": [
    "start",
    "center",
    "end",
    "between"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, cardVariantKeys)
  },
  getVariantProps
})