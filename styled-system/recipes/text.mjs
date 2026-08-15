import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const textFn = /* @__PURE__ */ createRecipe('text', {
  "size": "md",
  "align": "left",
  "transform": "none",
  "weight": "normal"
}, [])

const textVariantMap = {
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
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

const textVariantKeys = Object.keys(textVariantMap)

export const text = /* @__PURE__ */ Object.assign(memo(textFn.recipeFn), {
  __recipe__: true,
  __name__: 'text',
  __getCompoundVariantCss__: textFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: textVariantKeys,
  variantMap: textVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, textVariantKeys)
  },
  getVariantProps: textFn.getVariantProps,
})