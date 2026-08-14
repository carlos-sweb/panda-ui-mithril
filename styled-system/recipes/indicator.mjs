import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const indicatorFn = /* @__PURE__ */ createRecipe('indicator', {}, [])

const indicatorVariantMap = {
  "horizontal": [
    "start",
    "center",
    "end"
  ],
  "vertical": [
    "top",
    "middle",
    "bottom"
  ]
}

const indicatorVariantKeys = Object.keys(indicatorVariantMap)

export const indicator = /* @__PURE__ */ Object.assign(memo(indicatorFn.recipeFn), {
  __recipe__: true,
  __name__: 'indicator',
  __getCompoundVariantCss__: indicatorFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: indicatorVariantKeys,
  variantMap: indicatorVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, indicatorVariantKeys)
  },
  getVariantProps: indicatorFn.getVariantProps,
})