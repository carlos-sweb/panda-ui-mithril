import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const radioFn = /* @__PURE__ */ createRecipe('radio', {
  "size": "md"
}, [])

const radioVariantMap = {
  "color": [
    "neutral",
    "primary",
    "secondary",
    "accent",
    "info",
    "success",
    "warning",
    "error"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ]
}

const radioVariantKeys = Object.keys(radioVariantMap)

export const radio = /* @__PURE__ */ Object.assign(memo(radioFn.recipeFn), {
  __recipe__: true,
  __name__: 'radio',
  __getCompoundVariantCss__: radioFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: radioVariantKeys,
  variantMap: radioVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, radioVariantKeys)
  },
  getVariantProps: radioFn.getVariantProps,
})