import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const loadingFn = /* @__PURE__ */ createRecipe('loading', {
  "size": "md"
}, [])

const loadingVariantMap = {
  "variant": [
    "spinner",
    "dots",
    "ring",
    "ball",
    "bars",
    "infinity"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ]
}

const loadingVariantKeys = Object.keys(loadingVariantMap)

export const loading = /* @__PURE__ */ Object.assign(memo(loadingFn.recipeFn), {
  __recipe__: true,
  __name__: 'loading',
  __getCompoundVariantCss__: loadingFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: loadingVariantKeys,
  variantMap: loadingVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, loadingVariantKeys)
  },
  getVariantProps: loadingFn.getVariantProps,
})