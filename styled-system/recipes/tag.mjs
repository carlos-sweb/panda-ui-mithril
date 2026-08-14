import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tagFn = /* @__PURE__ */ createRecipe('tag', {
  "variant": "default",
  "size": "md"
}, [])

const tagVariantMap = {
  "variant": [
    "default",
    "outline",
    "dash",
    "soft",
    "ghost",
    "info",
    "success",
    "warning",
    "error"
  ],
  "size": [
    "md",
    "lg"
  ],
  "clickable": [
    "true"
  ],
  "disabled": [
    "true"
  ],
  "square": [
    "true"
  ]
}

const tagVariantKeys = Object.keys(tagVariantMap)

export const tag = /* @__PURE__ */ Object.assign(memo(tagFn.recipeFn), {
  __recipe__: true,
  __name__: 'tag',
  __getCompoundVariantCss__: tagFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tagVariantKeys,
  variantMap: tagVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tagVariantKeys)
  },
  getVariantProps: tagFn.getVariantProps,
})