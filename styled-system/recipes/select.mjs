import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const selectFn = /* @__PURE__ */ createRecipe('select', {
  "size": "md"
}, [])

const selectVariantMap = {
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

const selectVariantKeys = Object.keys(selectVariantMap)

export const select = /* @__PURE__ */ Object.assign(memo(selectFn.recipeFn), {
  __recipe__: true,
  __name__: 'select',
  __getCompoundVariantCss__: selectFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: selectVariantKeys,
  variantMap: selectVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, selectVariantKeys)
  },
  getVariantProps: selectFn.getVariantProps,
})