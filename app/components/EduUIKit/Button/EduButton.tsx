import React, { forwardRef } from "react"
import { translate } from "../../../i18n"
import { EduBodyProps } from "../Typography/EduBody";
import {
  Button,
  ButtonProps,
  TamaguiElement,
  Theme,
  themeable,
  ThemeName,
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

export const EduButton = (propsIn: EduButtonProps) => {
  const {
    tx,
    text,
    txOptions,
    children,
    full = true,
    rounded = true,
    preset = "primary",
    ...rest
  } = propsIn;

  const i18nText = tx && translate(tx, txOptions);
  const content = children || text || i18nText;
  const theme: ThemeName
    = preset === "primary" ? "button_primary500" :
      preset === "social" ? "social" : "button_secondary"

  const { props } = useButton({
    // ...$base,
    ...$presets[preset],
    theme: theme,
    alignSelf: full ? "stretch" : "center",
    borderRadius: rounded ? "$10" : "$4",
    children: content,
    bg: propsIn.disabled ? "$statusDisabledButton" : "$background",
    ...rest,
  })

  return <Theme name={theme}><Button {...props} /></Theme>
}

const $base: ButtonProps = {
  fontSize: "$5",
  height: "$13",
  fontWeight: "700",
  borderColor: "$borderColor",
  pressStyle: { bg: "$backgroundStrong" },
}

const $presets = {
  primary: { ...$base } as ButtonProps,
  secondary: { ...$base } as ButtonProps,
  social: { ...$base, } as ButtonProps
}

// export const EduButton = themeable(
//   forwardRef<TamaguiElement, EduButtonProps>((propsIn, ref) => {
//     const {
//       tx,
//       text,
//       txOptions,
//       children,
//       full = true,
//       rounded = true,
//       preset = "primary",
//       theme = "primary500",
//       ...rest
//     } = propsIn

//     const i18nText = tx && translate(tx, txOptions)
//     const content = children || text || i18nText
//     const { props } = useButton({
//       // ...$base,
//       // ...$presets[preset],
//       // theme: theme,
//       alignSelf: full ? "stretch" : "center",
//       borderRadius: rounded ? "$10" : "$4",
//       children: content,
//       ...rest,
//     })

//     return <Button {...props} ref={ref} theme={theme} />
//   })
// )