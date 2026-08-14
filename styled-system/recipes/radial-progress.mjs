import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const radialProgressFn = /* @__PURE__ */ createRecipe('radial-progress', {}, [])

const radialProgressVariantMap = {}

const radialProgressVariantKeys = Object.keys(radialProgressVariantMap)

export const radialProgress = /* @__PURE__ */ Object.assign(memo(radialProgressFn.recipeFn), {
  __recipe__: true,
  __name__: 'radialProgress',
  __getCompoundVariantCss__: radialProgressFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: radialProgressVariantKeys,
  variantMap: radialProgressVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, radialProgressVariantKeys)
  },
  getVariantProps: radialProgressFn.getVariantProps,
})