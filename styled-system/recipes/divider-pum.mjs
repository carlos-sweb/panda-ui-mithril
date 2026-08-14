import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const dividerPUMFn = /* @__PURE__ */ createRecipe('divider', {}, [])

const dividerPUMVariantMap = {
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
  "direction": [
    "horizontal",
    "vertical"
  ],
  "placement": [
    "start",
    "end"
  ]
}

const dividerPUMVariantKeys = Object.keys(dividerPUMVariantMap)

export const dividerPUM = /* @__PURE__ */ Object.assign(memo(dividerPUMFn.recipeFn), {
  __recipe__: true,
  __name__: 'dividerPUM',
  __getCompoundVariantCss__: dividerPUMFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: dividerPUMVariantKeys,
  variantMap: dividerPUMVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, dividerPUMVariantKeys)
  },
  getVariantProps: dividerPUMFn.getVariantProps,
})