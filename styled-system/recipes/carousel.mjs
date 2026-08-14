import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const carouselFn = /* @__PURE__ */ createRecipe('carousel', {
  "direction": "horizontal",
  "align": "start"
}, [])

const carouselVariantMap = {
  "direction": [
    "horizontal",
    "vertical"
  ],
  "align": [
    "start",
    "center",
    "end"
  ]
}

const carouselVariantKeys = Object.keys(carouselVariantMap)

export const carousel = /* @__PURE__ */ Object.assign(memo(carouselFn.recipeFn), {
  __recipe__: true,
  __name__: 'carousel',
  __getCompoundVariantCss__: carouselFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: carouselVariantKeys,
  variantMap: carouselVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, carouselVariantKeys)
  },
  getVariantProps: carouselFn.getVariantProps,
})