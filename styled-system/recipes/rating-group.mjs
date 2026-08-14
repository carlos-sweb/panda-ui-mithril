import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const ratingGroupFn = /* @__PURE__ */ createRecipe('rating-group', {}, [])

const ratingGroupVariantMap = {}

const ratingGroupVariantKeys = Object.keys(ratingGroupVariantMap)

export const ratingGroup = /* @__PURE__ */ Object.assign(memo(ratingGroupFn.recipeFn), {
  __recipe__: true,
  __name__: 'ratingGroup',
  __getCompoundVariantCss__: ratingGroupFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: ratingGroupVariantKeys,
  variantMap: ratingGroupVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, ratingGroupVariantKeys)
  },
  getVariantProps: ratingGroupFn.getVariantProps,
})