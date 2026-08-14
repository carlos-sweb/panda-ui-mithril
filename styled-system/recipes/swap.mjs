import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const swapFn = /* @__PURE__ */ createRecipe('swap', {
  "size": "md"
}, [])

const swapVariantMap = {
  "style": [
    "rotate",
    "flip"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ]
}

const swapVariantKeys = Object.keys(swapVariantMap)

export const swap = /* @__PURE__ */ Object.assign(memo(swapFn.recipeFn), {
  __recipe__: true,
  __name__: 'swap',
  __getCompoundVariantCss__: swapFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: swapVariantKeys,
  variantMap: swapVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, swapVariantKeys)
  },
  getVariantProps: swapFn.getVariantProps,
})