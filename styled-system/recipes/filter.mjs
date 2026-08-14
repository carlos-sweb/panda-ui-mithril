import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const filterFn = /* @__PURE__ */ createRecipe('filter', {}, [])

const filterVariantMap = {}

const filterVariantKeys = Object.keys(filterVariantMap)

export const filter = /* @__PURE__ */ Object.assign(memo(filterFn.recipeFn), {
  __recipe__: true,
  __name__: 'filter',
  __getCompoundVariantCss__: filterFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: filterVariantKeys,
  variantMap: filterVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, filterVariantKeys)
  },
  getVariantProps: filterFn.getVariantProps,
})