import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const fabLabelFn = /* @__PURE__ */ createRecipe('fab-label', {}, [])

const fabLabelVariantMap = {}

const fabLabelVariantKeys = Object.keys(fabLabelVariantMap)

export const fabLabel = /* @__PURE__ */ Object.assign(memo(fabLabelFn.recipeFn), {
  __recipe__: true,
  __name__: 'fabLabel',
  __getCompoundVariantCss__: fabLabelFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: fabLabelVariantKeys,
  variantMap: fabLabelVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, fabLabelVariantKeys)
  },
  getVariantProps: fabLabelFn.getVariantProps,
})