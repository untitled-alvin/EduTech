import React from "react"
import { Body, BodyProps } from "../typography";
import { YStack, YStackProps } from "tamagui";

export type TagProps = {
  /**
   * Text which is looked up via i18n.
   */
  tx?: BodyProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: BodyProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: BodyProps["txOptions"]
} & YStackProps

export const Tag = ({ tx, text, txOptions, children, ...rest }: TagProps) => (
  <YStack br="$2" bg="rgba(51, 94, 247, 0.08)" paddingVertical='$1' paddingHorizontal='$2' {...rest}>
    <Body
      size="xs"
      weight="semibold"
      alignSelf="center"
      color="$primary500"
      numberOfLines={1}
      {... { tx, text, txOptions, children }}
    />
  </YStack>
)
