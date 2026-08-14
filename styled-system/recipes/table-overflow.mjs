import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tableOverflowFn = /* @__PURE__ */ createRecipe('table-overflow', {}, [])

const tableOverflowVariantMap = {}

const tableOverflowVariantKeys = Object.keys(tableOverflowVariantMap)

export const tableOverflow = /* @__PURE__ */ Object.assign(memo(tableOverflowFn.recipeFn), {
  __recipe__: true,
  __name__: 'tableOverflow',
  __getCompoundVariantCss__: tableOverflowFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tableOverflowVariantKeys,
  variantMap: tableOverflowVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tableOverflowVariantKeys)
  },
  getVariantProps: tableOverflowFn.getVariantProps,
})