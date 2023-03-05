import { Heading, IHeadingProps } from "native-base"
import React, { ReactElement } from "react"
import i18n from "i18n-js"
import { isRTL, translate, TxKeyPath } from "../../../i18n"
import { TextStyle } from "react-native"

type Presets = keyof typeof $presets

export interface EduHeadingProps extends IHeadingProps {
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
   * One of the different types of text presets.
   */
  preset?: Presets
  /** 
   * Children components.
   */
  children?: React.ReactNode
}

export function EduHeading(props: EduHeadingProps) {
  const {
    tx,
    text,
    txOptions,
    children,
    ...rest
  } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = children || text || i18nText
  const preset: Presets = $presets[props.preset] ? props.preset : "h1"

  return (
    <Heading style={$rtlStyle} {...$presets[preset]} {...rest}>
      {content}
    </Heading>
  )
}

const $baseStyle: IHeadingProps = {
  // color: colors.text,
  // fontSize: "5xl",
  fontWeight: "bold",
}

const $presets = {
  // Heading 1 / Bold / 48px 5xl
  h1: { ...$baseStyle, fontSize: "5xl" } as IHeadingProps,

  // Heading 2 / Bold / 40px 4xl (36) // TODO: 
  h2: { ...$baseStyle, fontSize: "4xl" } as IHeadingProps,

  // Heading 3 / Bold / 32px 3xl (30) // TODO: 
  h3: { ...$baseStyle, fontSize: "3xl" } as IHeadingProps,

  // Heading 4 / Bold / 24px 2xl
  h4: { ...$baseStyle, fontSize: "2xl" } as IHeadingProps,
  // h4:  { fontSize: "2xl", lineHeight: "2xl" }] as IHeadingProps,

  // Heading 5 / Bold / 20px xl
  h5: { ...$baseStyle, fontSize: "xl" } as IHeadingProps,

  // Heading 6 / Bold / 18px lg
  h6: { ...$baseStyle, fontSize: "lg" } as IHeadingProps,
}

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}


// const $presets = {
//   default: $baseStyle,

//   // Heading 1 / Bold / 48px 5xl
//   h1: { ...$baseStyle, fontSize: "5xl" , lineHeight: "5xl"} as IHeadingProps,

//   // Heading 2 / Bold / 40px 4xl (36) // TODO: 
//   h2: [$baseStyle, { fontSize: "4xl", lineHeight: "4xl" }] as IHeadingProps,

//   // Heading 3 / Bold / 32px 3xl (30) // TODO: 
//   h3: [$baseStyle, { fontSize: "3xl", lineHeight: "3xl" }] as IHeadingProps,

//   // Heading 4 / Bold / 24px 2xl
//   h4: [$baseStyle, { fontSize: "2xl", lineHeight: "xl" }] as IHeadingProps,
//   // h4: [$baseStyle, { fontSize: "2xl", lineHeight: "2xl" }] as IHeadingProps,

//   // Heading 5 / Bold / 20px xl
//   h5: [$baseStyle, { fontSize: "xl", lineHeight: "lg" }] as IHeadingProps,

//   // Heading 6 / Bold / 18px lg
//   h6: [$baseStyle, { fontSize: "lg", lineHeight: "md" }] as IHeadingProps,
// }
