import { ITextProps } from "native-base"
import React from "react"
import { EduText, EduTextProps } from "./EduText"

type Sizes = keyof typeof $sizes
type Types = keyof typeof $types

export interface EduBodyProps extends EduTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: EduTextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: EduTextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: EduTextProps["txOptions"]
  /**
   * One of the different types of text presets.
   */
  sizeT?: Sizes
  /**
   * One of the different types of text presets.
   */
  type?: Types
  /** 
   * Children components.
   */
  children?: React.ReactNode
}

export function EduBody(props: EduBodyProps) {
  const { ...rest } = props
  const size: Sizes = $sizes[props.sizeT] ? props.sizeT : "medium"
  const type: Types = $types[props.type] ? props.type : "medium"

  return (
    <EduText {...$sizes[size]} {...$types[type]} {...rest} />
  )
}
//   {content}
// </EduText>
const $baseStyle: ITextProps = {
  // color: colors.text,
  fontSize: "sm",
}

const $sizes = {

  // Body XLarge / Bold / 18px
  // Body XLarge / Semibold / 18px
  // Body XLarge / Medium / 18px
  // Body XLarge / Regular / 18px
  // lg
  xl: { ...$baseStyle, fontSize: "lg" } as ITextProps,

  // Body Large / Bold / 16px
  // Body Large / Semibold / 16px
  // Body Large / Medium / 16px
  // Body Large / Regular / 16px
  //   md
  large: { ...$baseStyle, fontSize: "md" } as ITextProps,

  // Body Medium / Bold / 14px
  // Body Medium / Semibold / 14px
  // Body Medium / Medium / 14px
  // Body Medium / Regular / 14px
  // sm
  medium: { ...$baseStyle, fontSize: "sm" } as ITextProps,

  // Body Small / Bold / 12px
  // Body Small / Semibold / 12px
  // Body Small / Medium / 12px
  // Body Small / Regular / 12px
  //   xs
  small: { ...$baseStyle, fontSize: "xs" } as ITextProps,

  // Body XSmall / Bold / 10px
  // Body XSmall / Semibold / 10px
  // Body XSmall / Medium / 10px
  // Body XSmall / Regular / 10px
  // 2xs
  xs: { ...$baseStyle, fontSize: "2xs" } as ITextProps,
}

const $types = {
  // Bold
  bold: { fontWeight: "bold" } as ITextProps,

  // Semibold
  semibold: { fontWeight: "semibold" } as ITextProps,

  // Medium
  medium: { fontWeight: "medium" } as ITextProps,

  // Regular / 400
  regular: { fontWeight: "thin" } as ITextProps,
  // regular: { fontWeight: "400" } as ITextProps,
}
