import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const statusFn = /* @__PURE__ */ createRecipe('status', {
  "size": "md"
}, [])

const statusVariantMap = {
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
  ]
}

const statusVariantKeys = Object.keys(statusVariantMap)

export const status = /* @__PURE__ */ Object.assign(memo(statusFn.recipeFn), {
  __recipe__: true,
  __name__: 'status',
  __getCompoundVariantCss__: statusFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: statusVariantKeys,
  variantMap: statusVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, statusVariantKeys)
  },
  getVariantProps: statusFn.getVariantProps,
})