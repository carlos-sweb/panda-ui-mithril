import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tabsFn = /* @__PURE__ */ createRecipe('tabs', {
  "size": "md"
}, [])

const tabsVariantMap = {
  "variant": [
    "box",
    "border",
    "lift"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ]
}

const tabsVariantKeys = Object.keys(tabsVariantMap)

export const tabs = /* @__PURE__ */ Object.assign(memo(tabsFn.recipeFn), {
  __recipe__: true,
  __name__: 'tabs',
  __getCompoundVariantCss__: tabsFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tabsVariantKeys,
  variantMap: tabsVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tabsVariantKeys)
  },
  getVariantProps: tabsFn.getVariantProps,
})