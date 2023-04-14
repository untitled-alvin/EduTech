import React, { forwardRef } from "react"
import {
  // TextProps,
  // Text,
  Paragraph,
  ParagraphProps,
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
} & ParagraphProps

export const Text = themeable(
  forwardRef<TamaguiElement, TextProps>((propsIn, ref) => {
    const {
      tx,
      text,
      txOptions,
      children,
      ...rest
    } = propsIn

    const i18nText = tx && translate(tx, txOptions)
    const content = children || text || i18nText

    return <Paragraph style={$rtlStyle} color="$color" {...rest}>{content}</Paragraph>
  })
)

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}
