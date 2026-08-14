import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const indicatorItemFn = /* @__PURE__ */ createRecipe('indicator-item', {}, [])

const indicatorItemVariantMap = {}

const indicatorItemVariantKeys = Object.keys(indicatorItemVariantMap)

export const indicatorItem = /* @__PURE__ */ Object.assign(memo(indicatorItemFn.recipeFn), {
  __recipe__: true,
  __name__: 'indicatorItem',
  __getCompoundVariantCss__: indicatorItemFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: indicatorItemVariantKeys,
  variantMap: indicatorItemVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, indicatorItemVariantKeys)
  },
  getVariantProps: indicatorItemFn.getVariantProps,
})