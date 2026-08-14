import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const fabFn = /* @__PURE__ */ createRecipe('fab', {}, [])

const fabVariantMap = {}

const fabVariantKeys = Object.keys(fabVariantMap)

export const fab = /* @__PURE__ */ Object.assign(memo(fabFn.recipeFn), {
  __recipe__: true,
  __name__: 'fab',
  __getCompoundVariantCss__: fabFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: fabVariantKeys,
  variantMap: fabVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, fabVariantKeys)
  },
  getVariantProps: fabFn.getVariantProps,
})