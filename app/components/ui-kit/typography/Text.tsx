import React, { forwardRef } from "react"
import {
  Paragraph,
  ParagraphProps,
  TextProps as TMGTextProps,
  TamaguiElement,
  themeable,
} from "tamagui"
import i18n from "i18n-js"
import { isRTL, translate, TxKeyPath } from "../../../i18n"
import { TextStyle } from "react-native"

export type TextProps = {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions
} & TMGTextProps

export const Text = Paragraph.extractable((props: TextProps) => {
  const {
    tx,
    text,
    txOptions,
    children,
    ...rest
  } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = children || text || i18nText

  return <Paragraph style={$rtlStyle} {...rest}>{content}</Paragraph>
})


// export type TextProps = {
//   /**
//    * Text which is looked up via i18n.
//    */
//   tx?: TxKeyPath
//   /**
//    * The text to display if not using `tx` or nested components.
//    */
//   text?: string
//   /**
//    * Optional options to pass to i18n. Useful for interpolation
//    * as well as explicitly setting locale or translation fallbacks.
//    */
//   txOptions?: i18n.TranslateOptions
// } & TMGTextProps

// export const Text = themeable(
//   forwardRef<TamaguiElement, TextProps>((propsIn, ref) => {
//     const {
//       tx,
//       text,
//       txOptions,
//       children,
//       ...rest
//     } = propsIn

//     const i18nText = tx && translate(tx, txOptions)
//     const content = children || text || i18nText

//     return <TMGText style={$rtlStyle} color="$color" {...rest}>{content}</TMGText>
//   })
// )

// export type TextProps = {
//   /**
//    * Text which is looked up via i18n.
//    */
//   tx?: TxKeyPath
//   /**
//    * The text to display if not using `tx` or nested components.
//    */
//   text?: string
//   /**
//    * Optional options to pass to i18n. Useful for interpolation
//    * as well as explicitly setting locale or translation fallbacks.
//    */
//   txOptions?: i18n.TranslateOptions
// } & ParagraphProps

// export const Text = themeable(
//   forwardRef<TamaguiElement, TextProps>((propsIn, ref) => {
//     const {
//       tx,
//       text,
//       txOptions,
//       children,
//       ...rest
//     } = propsIn

//     const i18nText = tx && translate(tx, txOptions)
//     const content = children || text || i18nText

//     return <Paragraph ref={ref} style={$rtlStyle} {...rest}>{content}</Paragraph>
//   })
// )

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}
