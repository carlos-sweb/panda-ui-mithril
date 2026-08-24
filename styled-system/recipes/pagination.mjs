import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const paginationFn = /* @__PURE__ */ createRecipe('pagination', {
  "variant": "joined",
  "shape": "square",
  "size": "md"
}, [])

const paginationVariantMap = {
  "variant": [
    "joined",
    "separated"
  ],
  "shape": [
    "square",
    "circle"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ]
}

const paginationVariantKeys = Object.keys(paginationVariantMap)

export const pagination = /* @__PURE__ */ Object.assign(memo(paginationFn.recipeFn), {
  __recipe__: true,
  __name__: 'pagination',
  __getCompoundVariantCss__: paginationFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: paginationVariantKeys,
  variantMap: paginationVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, paginationVariantKeys)
  },
  getVariantProps: paginationFn.getVariantProps,
})