import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const fileInputFn = /* @__PURE__ */ createRecipe('fileInput', {
  "size": "md"
}, [])

const fileInputVariantMap = {
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

const fileInputVariantKeys = Object.keys(fileInputVariantMap)

export const fileInput = /* @__PURE__ */ Object.assign(memo(fileInputFn.recipeFn), {
  __recipe__: true,
  __name__: 'fileInput',
  __getCompoundVariantCss__: fileInputFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: fileInputVariantKeys,
  variantMap: fileInputVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, fileInputVariantKeys)
  },
  getVariantProps: fileInputFn.getVariantProps,
})