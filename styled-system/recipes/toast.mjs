import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const toastFn = /* @__PURE__ */ createRecipe('toast', {
  "horizontal": "end",
  "vertical": "bottom"
}, [])

const toastVariantMap = {
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

const toastVariantKeys = Object.keys(toastVariantMap)

export const toast = /* @__PURE__ */ Object.assign(memo(toastFn.recipeFn), {
  __recipe__: true,
  __name__: 'toast',
  __getCompoundVariantCss__: toastFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: toastVariantKeys,
  variantMap: toastVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, toastVariantKeys)
  },
  getVariantProps: toastFn.getVariantProps,
})