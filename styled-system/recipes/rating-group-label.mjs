import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const ratingGroupLabelFn = /* @__PURE__ */ createRecipe('rating-group-label', {}, [])

const ratingGroupLabelVariantMap = {}

const ratingGroupLabelVariantKeys = Object.keys(ratingGroupLabelVariantMap)

export const ratingGroupLabel = /* @__PURE__ */ Object.assign(memo(ratingGroupLabelFn.recipeFn), {
  __recipe__: true,
  __name__: 'ratingGroupLabel',
  __getCompoundVariantCss__: ratingGroupLabelFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: ratingGroupLabelVariantKeys,
  variantMap: ratingGroupLabelVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, ratingGroupLabelVariantKeys)
  },
  getVariantProps: ratingGroupLabelFn.getVariantProps,
})