import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const ChatBubblePUMDefaultVariants = {
  "placement": "start",
  "size": "md"
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
  ],
  [
    "window",
    "chat__window"
  ],
  [
    "header",
    "chat__header"
  ],
  [
    "messages",
    "chat__messages"
  ],
  [
    "footer",
    "chat__footer"
  ],
  [
    "message",
    "chat__message"
  ],
  [
    "reply",
    "chat__reply"
  ],
  [
    "reactions",
    "chat__reactions"
  ],
  [
    "status",
    "chat__status"
  ],
  [
    "audio",
    "chat__audio"
  ],
  [
    "video",
    "chat__video"
  ],
  [
    "image",
    "chat__image"
  ],
  [
    "file",
    "chat__file"
  ],
  [
    "link",
    "chat__link"
  ],
  [
    "system",
    "chat__system"
  ],
  [
    "input",
    "chat__input"
  ],
  [
    "typing",
    "chat__typing"
  ]
]
const ChatBubblePUMSlotFns = /* @__PURE__ */ ChatBubblePUMSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, ChatBubblePUMDefaultVariants, getSlotCompoundVariant(ChatBubblePUMCompoundVariants, slotName))])

const ChatBubblePUMFn = memo((props = {}) => {
  return Object.fromEntries(ChatBubblePUMSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const ChatBubblePUMVariantKeys = [
  "placement",
  "color",
  "size",
  "status",
  "grouped"
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
  ],
  "size": [
    "sm",
    "md",
    "lg"
  ],
  "status": [
    "sent",
    "delivered",
    "read"
  ],
  "grouped": [
    "true",
    "false"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, ChatBubblePUMVariantKeys)
  },
  getVariantProps
})