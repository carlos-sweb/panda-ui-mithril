import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const footerDefaultVariants = {}
const footerCompoundVariants = [
  {
    "center": true,
    "direction": "horizontal",
    "css": {
      "footer": {
        "gridAutoFlow": "row dense"
      }
    }
  },
  {
    "center": true,
    "direction": "vertical",
    "css": {
      "footer": {
        "gridAutoFlow": "column dense"
      }
    }
  }
]

const footerSlotNames = [
  [
    "footer",
    "footer__footer"
  ],
  [
    "title",
    "footer__title"
  ]
]
const footerSlotFns = /* @__PURE__ */ footerSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, footerDefaultVariants, getSlotCompoundVariant(footerCompoundVariants, slotName))])

const footerFn = memo((props = {}) => {
  return Object.fromEntries(footerSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const footerVariantKeys = [
  "center",
  "direction"
]
const getVariantProps = (variants) => ({ ...footerDefaultVariants, ...compact(variants) })

export const footer = /* @__PURE__ */ Object.assign(footerFn, {
  __recipe__: false,
  __name__: 'footer',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: footerVariantKeys,
  variantMap: {
  "center": [
    "true"
  ],
  "direction": [
    "horizontal",
    "vertical"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, footerVariantKeys)
  },
  getVariantProps
})