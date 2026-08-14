import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const containerPUMFn = /* @__PURE__ */ createRecipe('container', {
  "maxWidth": "fullhd"
}, [])

const containerPUMVariantMap = {
  "maxWidth": [
    "fullhd",
    "widescreen",
    "desktop",
    "tablet"
  ],
  "fluid": [
    "true"
  ]
}

const containerPUMVariantKeys = Object.keys(containerPUMVariantMap)

export const containerPUM = /* @__PURE__ */ Object.assign(memo(containerPUMFn.recipeFn), {
  __recipe__: true,
  __name__: 'containerPUM',
  __getCompoundVariantCss__: containerPUMFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: containerPUMVariantKeys,
  variantMap: containerPUMVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, containerPUMVariantKeys)
  },
  getVariantProps: containerPUMFn.getVariantProps,
})