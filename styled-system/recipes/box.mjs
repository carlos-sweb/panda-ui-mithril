import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const boxFn = /* @__PURE__ */ createRecipe('box', {
  "padding": "md",
  "shadow": "md"
}, [])

const boxVariantMap = {
  "padding": [
    "sm",
    "md",
    "lg"
  ],
  "shadow": [
    "sm",
    "md",
    "lg",
    "none"
  ]
}

const boxVariantKeys = Object.keys(boxVariantMap)

export const box = /* @__PURE__ */ Object.assign(memo(boxFn.recipeFn), {
  __recipe__: true,
  __name__: 'box',
  __getCompoundVariantCss__: boxFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: boxVariantKeys,
  variantMap: boxVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, boxVariantKeys)
  },
  getVariantProps: boxFn.getVariantProps,
})