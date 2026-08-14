import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const titleFn = /* @__PURE__ */ createRecipe('title', {
  "size": "1",
  "align": "left",
  "transform": "none",
  "weight": "normal"
}, [])

const titleVariantMap = {
  "size": [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7"
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
  "align": [
    "left",
    "center",
    "right",
    "justify"
  ],
  "transform": [
    "none",
    "capitalize",
    "uppercase",
    "lowercase"
  ],
  "weight": [
    "light",
    "normal",
    "medium",
    "semibold",
    "bold",
    "extrabold"
  ],
  "truncate": [
    "true"
  ],
  "italic": [
    "true"
  ]
}

const titleVariantKeys = Object.keys(titleVariantMap)

export const title = /* @__PURE__ */ Object.assign(memo(titleFn.recipeFn), {
  __recipe__: true,
  __name__: 'title',
  __getCompoundVariantCss__: titleFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: titleVariantKeys,
  variantMap: titleVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, titleVariantKeys)
  },
  getVariantProps: titleFn.getVariantProps,
})