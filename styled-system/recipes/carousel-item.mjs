import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const carouselItemFn = /* @__PURE__ */ createRecipe('carousel-item', {}, [])

const carouselItemVariantMap = {}

const carouselItemVariantKeys = Object.keys(carouselItemVariantMap)

export const carouselItem = /* @__PURE__ */ Object.assign(memo(carouselItemFn.recipeFn), {
  __recipe__: true,
  __name__: 'carouselItem',
  __getCompoundVariantCss__: carouselItemFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: carouselItemVariantKeys,
  variantMap: carouselItemVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, carouselItemVariantKeys)
  },
  getVariantProps: carouselItemFn.getVariantProps,
})