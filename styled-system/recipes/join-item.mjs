import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const joinItemFn = /* @__PURE__ */ createRecipe('join-item', {}, [])

const joinItemVariantMap = {}

const joinItemVariantKeys = Object.keys(joinItemVariantMap)

export const joinItem = /* @__PURE__ */ Object.assign(memo(joinItemFn.recipeFn), {
  __recipe__: true,
  __name__: 'joinItem',
  __getCompoundVariantCss__: joinItemFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: joinItemVariantKeys,
  variantMap: joinItemVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, joinItemVariantKeys)
  },
  getVariantProps: joinItemFn.getVariantProps,
})