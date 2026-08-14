import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const checkboxFn = /* @__PURE__ */ createRecipe('checkbox', {
  "size": "md"
}, [])

const checkboxVariantMap = {
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

const checkboxVariantKeys = Object.keys(checkboxVariantMap)

export const checkbox = /* @__PURE__ */ Object.assign(memo(checkboxFn.recipeFn), {
  __recipe__: true,
  __name__: 'checkbox',
  __getCompoundVariantCss__: checkboxFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: checkboxVariantKeys,
  variantMap: checkboxVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, checkboxVariantKeys)
  },
  getVariantProps: checkboxFn.getVariantProps,
})