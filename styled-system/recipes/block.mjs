import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const blockFn = /* @__PURE__ */ createRecipe('block', {
  "spacing": "md"
}, [])

const blockVariantMap = {
  "spacing": [
    "sm",
    "md",
    "lg"
  ]
}

const blockVariantKeys = Object.keys(blockVariantMap)

export const block = /* @__PURE__ */ Object.assign(memo(blockFn.recipeFn), {
  __recipe__: true,
  __name__: 'block',
  __getCompoundVariantCss__: blockFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: blockVariantKeys,
  variantMap: blockVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, blockVariantKeys)
  },
  getVariantProps: blockFn.getVariantProps,
})