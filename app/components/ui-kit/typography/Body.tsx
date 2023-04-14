import React from "react"
import { Text, TextProps } from "./Text"

export type BodyProps = Omit<TextProps, 'size' | 'type'> & {
  /**
   * One of the different types of text presets.
   */
  size?: keyof typeof $sizes
  /**
   * One of the different types of text presets.
   */
  weight?: keyof typeof $weights
}

export function Body(props: BodyProps) {
  const { size = "medium", weight = "medium", ...rest } = props
  const textProps: TextProps = {
    ...$base,
    ...$sizes[size],
    ...$weights[weight],
    ...rest,
  }

  return <Text {...textProps} />
}

const $base: TextProps = {
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
  xl: { size: "$lg" } as TextProps,

  // Body Large / Bold / 16px
  // Body Large / Semibold / 16px
  // Body Large / Medium / 16px
  // Body Large / Regular / 16px
  //   md
  large: { size: "$md" } as TextProps,

  // Body Medium / Bold / 14px
  // Body Medium / Semibold / 14px
  // Body Medium / Medium / 14px
  // Body Medium / Regular / 14px
  // sm
  medium: { size: "$sm" } as TextProps,

  // Body Small / Bold / 12px
  // Body Small / Semibold / 12px
  // Body Small / Medium / 12px
  // Body Small / Regular / 12px
  //   xs
  small: { size: "$xs" } as TextProps,

  // Body XSmall / Bold / 10px
  // Body XSmall / Semibold / 10px
  // Body XSmall / Medium / 10px
  // Body XSmall / Regular / 10px
  // 2xs
  xs: { size: "$2xs" } as TextProps,
}

const $weights = {
  // Regular / 400
  // regular: { fontWeight: "$regular" } as TextProps,
  regular: { fontWeight: "regular" } as TextProps,

  // Medium
  // medium: { fontWeight: "$medium" } as TextProps,
  medium: { fontWeight: "medium" } as TextProps,

  // Semibold
  // semibold: { fontWeight: "$semibold" } as TextProps,
  semibold: { fontWeight: "semibold" } as TextProps,

  // Bold
  // bold: { fontWeight: "$bold" } as TextProps,
  bold: { fontWeight: "bold" } as TextProps,
}
