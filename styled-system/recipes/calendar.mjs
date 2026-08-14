import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const calendarDefaultVariants = {}
const calendarCompoundVariants = []

const calendarSlotNames = [
  [
    "calendar",
    "calendar__calendar"
  ],
  [
    "header",
    "calendar__header"
  ],
  [
    "nav",
    "calendar__nav"
  ],
  [
    "grid",
    "calendar__grid"
  ],
  [
    "weekday",
    "calendar__weekday"
  ],
  [
    "day",
    "calendar__day"
  ]
]
const calendarSlotFns = /* @__PURE__ */ calendarSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, calendarDefaultVariants, getSlotCompoundVariant(calendarCompoundVariants, slotName))])

const calendarFn = memo((props = {}) => {
  return Object.fromEntries(calendarSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const calendarVariantKeys = [
  "outside",
  "today",
  "selected",
  "disabled"
]
const getVariantProps = (variants) => ({ ...calendarDefaultVariants, ...compact(variants) })

export const calendar = /* @__PURE__ */ Object.assign(calendarFn, {
  __recipe__: false,
  __name__: 'calendar',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: calendarVariantKeys,
  variantMap: {
  "outside": [
    "true"
  ],
  "today": [
    "true"
  ],
  "selected": [
    "true"
  ],
  "disabled": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, calendarVariantKeys)
  },
  getVariantProps
})