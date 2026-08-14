import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const optFn = /* @__PURE__ */ createRecipe('otp', {
  "size": "md"
}, [])

const optVariantMap = {
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

const optVariantKeys = Object.keys(optVariantMap)

export const opt = /* @__PURE__ */ Object.assign(memo(optFn.recipeFn), {
  __recipe__: true,
  __name__: 'opt',
  __getCompoundVariantCss__: optFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: optVariantKeys,
  variantMap: optVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, optVariantKeys)
  },
  getVariantProps: optFn.getVariantProps,
})