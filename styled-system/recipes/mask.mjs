import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const maskFn = /* @__PURE__ */ createRecipe('mask', {}, [])

const maskVariantMap = {
  "shape": [
    "square",
    "squircle",
    "decagon",
    "diamond",
    "heart",
    "hexagon",
    "hexagon-2",
    "circle",
    "pentagon",
    "star",
    "star-2",
    "triangle",
    "triangle-2",
    "triangle-3",
    "triangle-4"
  ],
  "half": [
    "1",
    "2"
  ]
}

const maskVariantKeys = Object.keys(maskVariantMap)

export const mask = /* @__PURE__ */ Object.assign(memo(maskFn.recipeFn), {
  __recipe__: true,
  __name__: 'mask',
  __getCompoundVariantCss__: maskFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: maskVariantKeys,
  variantMap: maskVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, maskVariantKeys)
  },
  getVariantProps: maskFn.getVariantProps,
})