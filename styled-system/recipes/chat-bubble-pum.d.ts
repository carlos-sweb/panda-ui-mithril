/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ChatBubblePUMVariant {
  /**
 * @default "start"
 */
placement: "start" | "end"
color: "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"
}

type ChatBubblePUMVariantMap = {
  [key in keyof ChatBubblePUMVariant]: Array<ChatBubblePUMVariant[key]>
}

type ChatBubblePUMSlot = "chat" | "bubble"

export type ChatBubblePUMVariantProps = {
  [key in keyof ChatBubblePUMVariant]?: ConditionalValue<ChatBubblePUMVariant[key]> | undefined
}

export interface ChatBubblePUMRecipe {
  __slot: ChatBubblePUMSlot
  __type: ChatBubblePUMVariantProps
  (props?: ChatBubblePUMVariantProps): Pretty<Record<ChatBubblePUMSlot, string>>
  raw: (props?: ChatBubblePUMVariantProps) => ChatBubblePUMVariantProps
  variantMap: ChatBubblePUMVariantMap
  variantKeys: Array<keyof ChatBubblePUMVariant>
  splitVariantProps<Props extends ChatBubblePUMVariantProps>(props: Props): [ChatBubblePUMVariantProps, Pretty<DistributiveOmit<Props, keyof ChatBubblePUMVariantProps>>]
  getVariantProps: (props?: ChatBubblePUMVariantProps) => ChatBubblePUMVariantProps
}


export declare const ChatBubblePUM: ChatBubblePUMRecipe