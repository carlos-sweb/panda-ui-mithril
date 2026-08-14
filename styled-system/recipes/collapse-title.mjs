import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const collapseTitleFn = /* @__PURE__ */ createRecipe('collapse-title', {}, [])

const collapseTitleVariantMap = {}

const collapseTitleVariantKeys = Object.keys(collapseTitleVariantMap)

export const collapseTitle = /* @__PURE__ */ Object.assign(memo(collapseTitleFn.recipeFn), {
  __recipe__: true,
  __name__: 'collapseTitle',
  __getCompoundVariantCss__: collapseTitleFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: collapseTitleVariantKeys,
  variantMap: collapseTitleVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, collapseTitleVariantKeys)
  },
  getVariantProps: collapseTitleFn.getVariantProps,
})