import React from "react"
import { EduText, EduTextProps } from "./EduText"

type Sizes = keyof typeof $sizes
type Types = keyof typeof $types

export type EduBodyProps = {
  /**
   * One of the different types of text presets.
   */
  sizeT?: Sizes
  /**
   * One of the different types of text presets.
   */
  type?: Types
} & EduTextProps

export function EduBody(props: EduBodyProps) {
  const { ...rest } = props
  const size: Sizes = $sizes[props.sizeT] ? props.sizeT : "medium"
  const type: Types = $types[props.type] ? props.type : "medium"
  return <EduText {...$sizes[size]} {...$types[type]} {...rest} />
}

const $base: EduTextProps = {
  // color: colors.text,
  // fontSize: "sm",
  // accessibilityRole: 'body',
  // name: 'Heading1',
  fontWeight: "$sm",
  tag: 'span',
  fontFamily: '$body',
}

const $sizes = {
  // Body XLarge / Bold / 18px
  // Body XLarge / Semibold / 18px
  // Body XLarge / Medium / 18px
  // Body XLarge / Regular / 18px
  // lg
  xl: { ...$base, size: "$lg" } as EduTextProps,

  // Body Large / Bold / 16px
  // Body Large / Semibold / 16px
  // Body Large / Medium / 16px
  // Body Large / Regular / 16px
  //   md
  large: { ...$base, size: "$md" } as EduTextProps,

  // Body Medium / Bold / 14px
  // Body Medium / Semibold / 14px
  // Body Medium / Medium / 14px
  // Body Medium / Regular / 14px
  // sm
  medium: { ...$base, size: "$sm" } as EduTextProps,

  // Body Small / Bold / 12px
  // Body Small / Semibold / 12px
  // Body Small / Medium / 12px
  // Body Small / Regular / 12px
  //   xs
  small: { ...$base, size: "$xs" } as EduTextProps,

  // Body XSmall / Bold / 10px
  // Body XSmall / Semibold / 10px
  // Body XSmall / Medium / 10px
  // Body XSmall / Regular / 10px
  // 2xs
  xs: { ...$base, size: "$2xs" } as EduTextProps,
}

const $types = {
  // Regular / 400
  // regular: { fontWeight: "$regular" } as EduTextProps,
  regular: { fontWeight: "regular" } as EduTextProps,

  // Medium
  // medium: { fontWeight: "$medium" } as EduTextProps,
  medium: { fontWeight: "medium" } as EduTextProps,

  // Semibold
  // semibold: { fontWeight: "$semibold" } as EduTextProps,
  semibold: { fontWeight: "semibold" } as EduTextProps,

  // Bold
  // bold: { fontWeight: "$bold" } as EduTextProps,
  bold: { fontWeight: "bold" } as EduTextProps,
}
