import React, { forwardRef } from "react"
import { EduBodyProps } from "../Typography/EduBody";
import { Button, ButtonProps, TamaguiElement, themeable, useButton } from "tamagui";
import { translate } from "../../../i18n";

export type LinkButtonProps = ButtonProps & {
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
}

export const LinkButton = themeable(
  forwardRef<TamaguiElement, LinkButtonProps>((propsIn, ref) => {
    const {
      tx,
      text,
      txOptions,
      children,
      ...rest
    } = propsIn

    const i18nText = tx && translate(tx, txOptions)
    const content = children || text || i18nText
    const { props } = useButton(rest)
    const buttonProps: ButtonProps = { ...$base, ...props }

    return <Button {...buttonProps} children={content} ref={ref} />
  })
)

const $base: ButtonProps = {
  fontWeight: "bold",
  fontSize: "$md",
  padding: "$0",
  margin: "$0",
  height: "$6",
  alignSelf: "center",
  color: "$primary500",
  // pressStyle: { backgroundColor: "$primary200" },
  backgroundColor: "transparent"
}