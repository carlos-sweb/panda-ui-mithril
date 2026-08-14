import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const stackPUMFn = /* @__PURE__ */ createRecipe('stack', {
  "direction": "column",
  "gap": "md",
  "align": "stretch"
}, [])

const stackPUMVariantMap = {
  "direction": [
    "column",
    "row"
  ],
  "gap": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  "align": [
    "start",
    "center",
    "end",
    "stretch"
  ],
  "justify": [
    "start",
    "center",
    "end",
    "between",
    "around"
  ]
}

const stackPUMVariantKeys = Object.keys(stackPUMVariantMap)

export const stackPUM = /* @__PURE__ */ Object.assign(memo(stackPUMFn.recipeFn), {
  __recipe__: true,
  __name__: 'stackPUM',
  __getCompoundVariantCss__: stackPUMFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: stackPUMVariantKeys,
  variantMap: stackPUMVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, stackPUMVariantKeys)
  },
  getVariantProps: stackPUMFn.getVariantProps,
})