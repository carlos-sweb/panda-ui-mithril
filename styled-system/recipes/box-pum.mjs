import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const boxPUMFn = /* @__PURE__ */ createRecipe('box', {
  "padding": "md",
  "shadow": "md"
}, [])

const boxPUMVariantMap = {
  "padding": [
    "sm",
    "md",
    "lg"
  ],
  "shadow": [
    "sm",
    "md",
    "lg",
    "none"
  ]
}

const boxPUMVariantKeys = Object.keys(boxPUMVariantMap)

export const boxPUM = /* @__PURE__ */ Object.assign(memo(boxPUMFn.recipeFn), {
  __recipe__: true,
  __name__: 'boxPUM',
  __getCompoundVariantCss__: boxPUMFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: boxPUMVariantKeys,
  variantMap: boxPUMVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, boxPUMVariantKeys)
  },
  getVariantProps: boxPUMFn.getVariantProps,
})