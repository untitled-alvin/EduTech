import React from "react"
import { EduText, EduTextProps } from "./EduText"

type Presets = keyof typeof $presets

export type EduHeadingProps = {
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
} & EduTextProps

export function EduHeading(props: EduHeadingProps) {
  const preset: Presets = $presets[props.preset] ? props.preset : "h1"
  return <EduText {...$presets[preset]} {...props} />
}

const $baseStyle: EduTextProps = {
  // name: 'Heading1',
  fontWeight: "$bold",
  tag: 'span',
  accessibilityRole: 'header',
  fontFamily: '$heading',
}

const $presets = {
  // Heading 1 / Bold / 48px 5xl
  h1: { ...$baseStyle, size: "$5xl" } as EduTextProps,

  // Heading 2 / Bold / 40px 4xl (36) // TODO: 
  h2: { ...$baseStyle, size: "$4xl" } as EduTextProps,

  // Heading 3 / Bold / 32px 3xl (30) // TODO: 
  h3: { ...$baseStyle, size: "$3xl" } as EduTextProps,

  // Heading 4 / Bold / 24px 2xl
  h4: { ...$baseStyle, size: "$2xl" } as EduTextProps,

  // Heading 5 / Bold / 20px xl
  h5: { ...$baseStyle, size: "$xl" } as EduTextProps,

  // Heading 6 / Bold / 18px lg
  h6: { ...$baseStyle, size: "$lg" } as EduTextProps,
}