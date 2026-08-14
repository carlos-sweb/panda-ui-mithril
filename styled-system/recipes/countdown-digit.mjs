import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const countdownDigitFn = /* @__PURE__ */ createRecipe('countdown-digit', {}, [])

const countdownDigitVariantMap = {}

const countdownDigitVariantKeys = Object.keys(countdownDigitVariantMap)

export const countdownDigit = /* @__PURE__ */ Object.assign(memo(countdownDigitFn.recipeFn), {
  __recipe__: true,
  __name__: 'countdownDigit',
  __getCompoundVariantCss__: countdownDigitFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: countdownDigitVariantKeys,
  variantMap: countdownDigitVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, countdownDigitVariantKeys)
  },
  getVariantProps: countdownDigitFn.getVariantProps,
})