import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const breadcrumbsFn = /* @__PURE__ */ createRecipe('breadcrumbs', {}, [])

const breadcrumbsVariantMap = {}

const breadcrumbsVariantKeys = Object.keys(breadcrumbsVariantMap)

export const breadcrumbs = /* @__PURE__ */ Object.assign(memo(breadcrumbsFn.recipeFn), {
  __recipe__: true,
  __name__: 'breadcrumbs',
  __getCompoundVariantCss__: breadcrumbsFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: breadcrumbsVariantKeys,
  variantMap: breadcrumbsVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, breadcrumbsVariantKeys)
  },
  getVariantProps: breadcrumbsFn.getVariantProps,
})