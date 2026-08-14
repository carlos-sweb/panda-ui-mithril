import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const tooltipFn = /* @__PURE__ */ createRecipe('tooltip', {
  "position": "top"
}, [])

const tooltipVariantMap = {
  "position": [
    "top",
    "bottom",
    "left",
    "right"
  ],
  "color": [
    "neutral",
    "primary",
    "secondary",
    "accent",
    "info",
    "success",
    "warning",
    "error"
  ]
}

const tooltipVariantKeys = Object.keys(tooltipVariantMap)

export const tooltip = /* @__PURE__ */ Object.assign(memo(tooltipFn.recipeFn), {
  __recipe__: true,
  __name__: 'tooltip',
  __getCompoundVariantCss__: tooltipFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tooltipVariantKeys,
  variantMap: tooltipVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, tooltipVariantKeys)
  },
  getVariantProps: tooltipFn.getVariantProps,
})