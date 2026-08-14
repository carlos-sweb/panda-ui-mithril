import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const ChatBubblePUMDefaultVariants = {
  "placement": "start"
}
const ChatBubblePUMCompoundVariants = []

const ChatBubblePUMSlotNames = [
  [
    "chat",
    "chat__chat"
  ],
  [
    "bubble",
    "chat__bubble"
  ]
]
const ChatBubblePUMSlotFns = /* @__PURE__ */ ChatBubblePUMSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, ChatBubblePUMDefaultVariants, getSlotCompoundVariant(ChatBubblePUMCompoundVariants, slotName))])

const ChatBubblePUMFn = memo((props = {}) => {
  return Object.fromEntries(ChatBubblePUMSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const ChatBubblePUMVariantKeys = [
  "placement",
  "color"
]
const getVariantProps = (variants) => ({ ...ChatBubblePUMDefaultVariants, ...compact(variants) })

export const ChatBubblePUM = /* @__PURE__ */ Object.assign(ChatBubblePUMFn, {
  __recipe__: false,
  __name__: 'ChatBubblePUM',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: ChatBubblePUMVariantKeys,
  variantMap: {
  "placement": [
    "start",
    "end"
  ],
  "color": [
    "neutral",
    "primary",
    "secondary",
    "accent",
    "info",
    "success",
    "warning",
    "error"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, ChatBubblePUMVariantKeys)
  },
  getVariantProps
})