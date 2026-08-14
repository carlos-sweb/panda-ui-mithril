import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const alertFn = /* @__PURE__ */ createRecipe('alert', {
  "direction": "horizontal"
}, [])

const alertVariantMap = {
  "color": [
    "info",
    "success",
    "warning",
    "error"
  ],
  "variant": [
    "outline",
    "dash",
    "soft"
  ],
  "direction": [
    "horizontal",
    "vertical"
  ]
}

const alertVariantKeys = Object.keys(alertVariantMap)

export const alert = /* @__PURE__ */ Object.assign(memo(alertFn.recipeFn), {
  __recipe__: true,
  __name__: 'alert',
  __getCompoundVariantCss__: alertFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: alertVariantKeys,
  variantMap: alertVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, alertVariantKeys)
  },
  getVariantProps: alertFn.getVariantProps,
})