import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const otpFn = /* @__PURE__ */ createRecipe('otp', {
  "size": "md"
}, [])

const otpVariantMap = {
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
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  "joined": [
    "true"
  ]
}

const otpVariantKeys = Object.keys(otpVariantMap)

export const otp = /* @__PURE__ */ Object.assign(memo(otpFn.recipeFn), {
  __recipe__: true,
  __name__: 'otp',
  __getCompoundVariantCss__: otpFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: otpVariantKeys,
  variantMap: otpVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, otpVariantKeys)
  },
  getVariantProps: otpFn.getVariantProps,
})