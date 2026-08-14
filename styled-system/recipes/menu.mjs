import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const menuFn = /* @__PURE__ */ createRecipe('menu', {
  "size": "md"
}, [])

const menuVariantMap = {
  "horizontal": [
    "true"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ]
}

const menuVariantKeys = Object.keys(menuVariantMap)

export const menu = /* @__PURE__ */ Object.assign(memo(menuFn.recipeFn), {
  __recipe__: true,
  __name__: 'menu',
  __getCompoundVariantCss__: menuFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: menuVariantKeys,
  variantMap: menuVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, menuVariantKeys)
  },
  getVariantProps: menuFn.getVariantProps,
})