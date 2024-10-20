import React from "react"
import { BodyProps } from "../typography";
import { Button, ButtonProps } from "tamagui";
import { translate } from "../../../i18n";

export type LinkButtonProps = ButtonProps & {
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
}

export const LinkButton = Button.styleable<LinkButtonProps>((propsIn, ref) => {
  const {
    tx,
    text,
    txOptions,
    children,
    ...rest
  } = propsIn

  const i18nText = tx && translate(tx, txOptions)
  const content = children || text || i18nText
  const buttonProps: ButtonProps = { ...$base, ...rest }

  return <Button {...buttonProps} children={content} ref={ref} />
})


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

// export const LinkButton = themeable(
//   forwardRef<TamaguiElement, LinkButtonProps>((propsIn, ref) => {
//     const {
//       tx,
//       text,
//       txOptions,
//       children,
//       ...rest
//     } = propsIn

//     const i18nText = tx && translate(tx, txOptions)
//     const content = children || text || i18nText
//     const { props } = useButton(rest)
//     const buttonProps: ButtonProps = { ...$base, ...props }

//     return <Button {...buttonProps} children={content} ref={ref} />
//   })
// )