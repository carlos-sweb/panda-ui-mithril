import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const countdownFn = /* @__PURE__ */ createRecipe('countdown', {}, [])

const countdownVariantMap = {}

const countdownVariantKeys = Object.keys(countdownVariantMap)

export const countdown = /* @__PURE__ */ Object.assign(memo(countdownFn.recipeFn), {
  __recipe__: true,
  __name__: 'countdown',
  __getCompoundVariantCss__: countdownFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: countdownVariantKeys,
  variantMap: countdownVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, countdownVariantKeys)
  },
  getVariantProps: countdownFn.getVariantProps,
})