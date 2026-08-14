import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const modalCloseButtonFn = /* @__PURE__ */ createRecipe('btn-close-modal', {}, [])

const modalCloseButtonVariantMap = {}

const modalCloseButtonVariantKeys = Object.keys(modalCloseButtonVariantMap)

export const modalCloseButton = /* @__PURE__ */ Object.assign(memo(modalCloseButtonFn.recipeFn), {
  __recipe__: true,
  __name__: 'modalCloseButton',
  __getCompoundVariantCss__: modalCloseButtonFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: modalCloseButtonVariantKeys,
  variantMap: modalCloseButtonVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, modalCloseButtonVariantKeys)
  },
  getVariantProps: modalCloseButtonFn.getVariantProps,
})