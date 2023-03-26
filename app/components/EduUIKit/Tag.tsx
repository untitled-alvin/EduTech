import React from "react"
import { EduBody, EduBodyProps } from "./Typography/EduBody";
import { YStack, YStackProps } from "tamagui";

export type TagProps = {
  /**
   * Text which is looked up via i18n.
   */
  tx?: EduBodyProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: EduBodyProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: EduBodyProps["txOptions"]
} & YStackProps

export function Tag(props: TagProps) {
  const {
    tx,
    text,
    txOptions,
    children,
    ...rest
  } = props

  return (
    <YStack
      paddingVertical='$1'
      paddingHorizontal='$2'
      borderRadius="$2"
      backgroundColor="rgba(51, 94, 247, 0.08)"
      {...rest}
    >
      <EduBody
        sizeT="xs"
        type="semibold"
        alignSelf="center"
        color="$primary500"
        numberOfLines={1}
        {... { tx, text, txOptions, children }}
      />
    </YStack>
  )
}





