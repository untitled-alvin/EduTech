import { ITextProps, Text } from "native-base"
import React from "react"
import i18n from "i18n-js"
import { isRTL, translate, TxKeyPath } from "../../../i18n"
import { TextStyle } from "react-native"

export interface EduTextProps extends ITextProps {
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
  /** 
   * Children components.
   */
  children?: React.ReactNode
}

export function EduText(props: EduTextProps) {
  const {
    tx,
    text,
    txOptions,
    children,
    ...rest
  } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = children || text || i18nText

  return (<Text color={"greyScale.900"} style={$rtlStyle} {...rest}>{content}</Text>)
}

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}
