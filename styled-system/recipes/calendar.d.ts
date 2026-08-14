/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CalendarVariant {
  outside: boolean
today: boolean
selected: boolean
disabled: boolean
}

type CalendarVariantMap = {
  [key in keyof CalendarVariant]: Array<CalendarVariant[key]>
}

type CalendarSlot = "calendar" | "header" | "nav" | "grid" | "weekday" | "day"

export type CalendarVariantProps = {
  [key in keyof CalendarVariant]?: ConditionalValue<CalendarVariant[key]> | undefined
}

export interface CalendarRecipe {
  __slot: CalendarSlot
  __type: CalendarVariantProps
  (props?: CalendarVariantProps): Pretty<Record<CalendarSlot, string>>
  raw: (props?: CalendarVariantProps) => CalendarVariantProps
  variantMap: CalendarVariantMap
  variantKeys: Array<keyof CalendarVariant>
  splitVariantProps<Props extends CalendarVariantProps>(props: Props): [CalendarVariantProps, Pretty<DistributiveOmit<Props, keyof CalendarVariantProps>>]
  getVariantProps: (props?: CalendarVariantProps) => CalendarVariantProps
}


export declare const calendar: CalendarRecipe