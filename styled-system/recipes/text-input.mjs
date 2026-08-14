import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const textInputFn = /* @__PURE__ */ createRecipe('input', {
  "size": "md"
}, [])

const textInputVariantMap = {
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
  "ghost": [
    "true"
  ]
}

const textInputVariantKeys = Object.keys(textInputVariantMap)

export const textInput = /* @__PURE__ */ Object.assign(memo(textInputFn.recipeFn), {
  __recipe__: true,
  __name__: 'textInput',
  __getCompoundVariantCss__: textInputFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: textInputVariantKeys,
  variantMap: textInputVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, textInputVariantKeys)
  },
  getVariantProps: textInputFn.getVariantProps,
})