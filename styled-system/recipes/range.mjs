import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const rangeFn = /* @__PURE__ */ createRecipe('range', {
  "size": "md"
}, [])

const rangeVariantMap = {
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
  "vertical": [
    "true"
  ]
}

const rangeVariantKeys = Object.keys(rangeVariantMap)

export const range = /* @__PURE__ */ Object.assign(memo(rangeFn.recipeFn), {
  __recipe__: true,
  __name__: 'range',
  __getCompoundVariantCss__: rangeFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: rangeVariantKeys,
  variantMap: rangeVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, rangeVariantKeys)
  },
  getVariantProps: rangeFn.getVariantProps,
})