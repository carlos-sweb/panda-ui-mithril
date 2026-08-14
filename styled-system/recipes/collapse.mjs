import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const collapseFn = /* @__PURE__ */ createRecipe('collapse', {}, [])

const collapseVariantMap = {
  "arrow": [
    "true"
  ],
  "plus": [
    "true"
  ],
  "border": [
    "true"
  ]
}

const collapseVariantKeys = Object.keys(collapseVariantMap)

export const collapse = /* @__PURE__ */ Object.assign(memo(collapseFn.recipeFn), {
  __recipe__: true,
  __name__: 'collapse',
  __getCompoundVariantCss__: collapseFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: collapseVariantKeys,
  variantMap: collapseVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, collapseVariantKeys)
  },
  getVariantProps: collapseFn.getVariantProps,
})