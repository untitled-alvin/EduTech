import React from "react"
import { Text, TextProps } from "./Text"

type Presets = keyof typeof $presets

export type HeadingProps = TextProps & { preset?: Presets }

export function Heading(props: HeadingProps) {
  const preset: Presets = $presets[props.preset] ? props.preset : "h1"
  return <Text {...$presets[preset]} {...props} />
}

const $base: TextProps = {
  accessibilityRole: 'header',
  fontWeight: "bold",
  tag: 'span',
  fontFamily: '$heading',
}

const $presets = {
  // Heading 1 / Bold / 48px 5xl
  h1: { ...$base, size: "$5xl" } as TextProps,

  // Heading 2 / Bold / 40px 4xl (36) // TODO: 
  h2: { ...$base, size: "$4xl" } as TextProps,

  // Heading 3 / Bold / 32px 3xl (30) // TODO: 
  h3: { ...$base, size: "$3xl" } as TextProps,

  // Heading 4 / Bold / 24px 2xl
  h4: { ...$base, size: "$2xl" } as TextProps,

  // Heading 5 / Bold / 20px xl
  h5: { ...$base, size: "$xl" } as TextProps,

  // Heading 6 / Bold / 18px lg
  h6: { ...$base, size: "$lg" } as TextProps,
}