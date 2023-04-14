import React, { forwardRef } from "react"
import { translate } from "../../../i18n"
import { BodyProps } from "../typography";
import {
  Button as TamaguiButton,
  ButtonProps as TamaguiButtonProps,
  ThemeName,
  useButton,
} from "tamagui";

type Presets = keyof typeof $presets

export type ButtonProps = TamaguiButtonProps & {
  preset?: Presets

  rounded?: boolean

  full?: boolean

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

export const Button = (propsIn: ButtonProps) => {
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
    = preset === "primary" ? "primary" :
      preset === "social" ? "social_Button" : "secondary_Button"

  const { props } = useButton({
    // ...$base,
    ...$presets[preset],
    componentName: "Button",
    alignSelf: full ? "stretch" : "center",
    borderRadius: rounded ? "$10" : "$4",
    children: content,
    bg: propsIn.disabled ? "$statusDisabledButton" : "$background",
    ...rest,
  })

  return <TamaguiButton theme={theme} {...props} />
}

const $base: TamaguiButtonProps = {
  fontSize: "$5",
  height: "$13",
  fontWeight: "700",
  borderColor: "$borderColor",
  pressStyle: { opacity: 0.8 }
  // pressStyle: { bg: "$backgroundStrong" },
}

const $presets = {
  primary: { ...$base } as TamaguiButtonProps,
  secondary: { ...$base } as TamaguiButtonProps,
  social: { ...$base, } as TamaguiButtonProps
}

// export const Button = themeable(
//   forwardRef<TamaguiElement, ButtonProps>((propsIn, ref) => {
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