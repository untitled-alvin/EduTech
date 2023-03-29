import React, { forwardRef } from "react"
import { translate } from "../../../i18n"
import { EduBodyProps } from "../Typography/EduBody";
import {
  Button,
  ButtonProps,
  TamaguiElement,
  themeable,
  useButton,
} from "tamagui";

type Presets = keyof typeof $presets

export type EduButtonProps = ButtonProps & {
  preset?: Presets

  rounded?: boolean

  full?: boolean

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

export const EduButton = themeable(
  forwardRef<TamaguiElement, EduButtonProps>((propsIn, ref) => {
    const {
      tx,
      text,
      txOptions,
      children,
      full = true,
      rounded = true,
      preset = "primary",
      ...rest
    } = propsIn

    const i18nText = tx && translate(tx, txOptions)
    const content = children || text || i18nText
    const { props } = useButton({
      ...$presets[preset],
      alignSelf: full ? "stretch" : "center",
      borderRadius: rounded ? "$10" : "$4",
      children: content,
      ...rest,
    })

    return <Button {...props} ref={ref} />
  })
)

const $base: ButtonProps = {
  fontWeight: "700",
  fontSize: "$5",
  height: "$13",
  // size: "$20",
  // paddingVertical: "$6",
  // justifyContent: "center",
  // borderRadius: "$5",
}

const $presets = {
  primary: {
    ...$base,
    // pressStyle: { backgroundColor: "$primary700" },
    // backgroundColor: "$primary500",
    // color: "white",
  } as ButtonProps,

  secondary: {
    ...$base,
    // pressStyle: { backgroundColor: "$primary200" },
    // backgroundColor: "$primary100",
    // color: "$primary500",
  } as ButtonProps
}
