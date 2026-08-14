import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const joinFn = /* @__PURE__ */ createRecipe('join', {}, [])

const joinVariantMap = {
  "vertical": [
    "true"
  ]
}

const joinVariantKeys = Object.keys(joinVariantMap)

export const join = /* @__PURE__ */ Object.assign(memo(joinFn.recipeFn), {
  __recipe__: true,
  __name__: 'join',
  __getCompoundVariantCss__: joinFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: joinVariantKeys,
  variantMap: joinVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, joinVariantKeys)
  },
  getVariantProps: joinFn.getVariantProps,
})