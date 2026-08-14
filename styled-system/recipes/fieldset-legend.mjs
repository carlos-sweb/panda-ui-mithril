import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const fieldsetLegendFn = /* @__PURE__ */ createRecipe('fieldset-legend', {}, [])

const fieldsetLegendVariantMap = {}

const fieldsetLegendVariantKeys = Object.keys(fieldsetLegendVariantMap)

export const fieldsetLegend = /* @__PURE__ */ Object.assign(memo(fieldsetLegendFn.recipeFn), {
  __recipe__: true,
  __name__: 'fieldsetLegend',
  __getCompoundVariantCss__: fieldsetLegendFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: fieldsetLegendVariantKeys,
  variantMap: fieldsetLegendVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, fieldsetLegendVariantKeys)
  },
  getVariantProps: fieldsetLegendFn.getVariantProps,
})