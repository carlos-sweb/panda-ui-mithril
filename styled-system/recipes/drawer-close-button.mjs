import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const drawerCloseButtonFn = /* @__PURE__ */ createRecipe('btn-close-drawer', {}, [])

const drawerCloseButtonVariantMap = {}

const drawerCloseButtonVariantKeys = Object.keys(drawerCloseButtonVariantMap)

export const drawerCloseButton = /* @__PURE__ */ Object.assign(memo(drawerCloseButtonFn.recipeFn), {
  __recipe__: true,
  __name__: 'drawerCloseButton',
  __getCompoundVariantCss__: drawerCloseButtonFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: drawerCloseButtonVariantKeys,
  variantMap: drawerCloseButtonVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, drawerCloseButtonVariantKeys)
  },
  getVariantProps: drawerCloseButtonFn.getVariantProps,
})