import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const buttonGroupFn = /* @__PURE__ */ createRecipe('button-group', {}, [])

const buttonGroupVariantMap = {
  "vertical": [
    "true"
  ]
}

const buttonGroupVariantKeys = Object.keys(buttonGroupVariantMap)

export const buttonGroup = /* @__PURE__ */ Object.assign(memo(buttonGroupFn.recipeFn), {
  __recipe__: true,
  __name__: 'buttonGroup',
  __getCompoundVariantCss__: buttonGroupFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: buttonGroupVariantKeys,
  variantMap: buttonGroupVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, buttonGroupVariantKeys)
  },
  getVariantProps: buttonGroupFn.getVariantProps,
})