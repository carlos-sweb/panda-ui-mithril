import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const dividerFn = /* @__PURE__ */ createRecipe('divider', {}, [])

const dividerVariantMap = {
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
  "direction": [
    "horizontal",
    "vertical"
  ],
  "placement": [
    "start",
    "end"
  ]
}

const dividerVariantKeys = Object.keys(dividerVariantMap)

export const divider = /* @__PURE__ */ Object.assign(memo(dividerFn.recipeFn), {
  __recipe__: true,
  __name__: 'divider',
  __getCompoundVariantCss__: dividerFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: dividerVariantKeys,
  variantMap: dividerVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, dividerVariantKeys)
  },
  getVariantProps: dividerFn.getVariantProps,
})