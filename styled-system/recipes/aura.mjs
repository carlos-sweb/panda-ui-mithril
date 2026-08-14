import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const auraFn = /* @__PURE__ */ createRecipe('aura', {
  "variant": "default",
  "size": "md"
}, [])

const auraVariantMap = {
  "variant": [
    "default",
    "rainbow",
    "holo",
    "dual",
    "silver",
    "gold",
    "glow"
  ],
  "shape": [
    "box",
    "field",
    "selector"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ]
}

const auraVariantKeys = Object.keys(auraVariantMap)

export const aura = /* @__PURE__ */ Object.assign(memo(auraFn.recipeFn), {
  __recipe__: true,
  __name__: 'aura',
  __getCompoundVariantCss__: auraFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: auraVariantKeys,
  variantMap: auraVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, auraVariantKeys)
  },
  getVariantProps: auraFn.getVariantProps,
})