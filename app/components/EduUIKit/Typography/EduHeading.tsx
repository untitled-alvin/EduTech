import React from "react"
import { EduText, EduTextProps } from "./EduText"

type Presets = keyof typeof $presets

export type EduHeadingProps = EduTextProps & { preset?: Presets }

export function EduHeading(props: EduHeadingProps) {
  const preset: Presets = $presets[props.preset] ? props.preset : "h1"
  return <EduText {...$presets[preset]} {...props} />
}

const $base: EduTextProps = {
  fontWeight: "bold",
  tag: 'span',
  accessibilityRole: 'header',
  fontFamily: '$heading',
}

const $presets = {
  // Heading 1 / Bold / 48px 5xl
  h1: { ...$base, size: "$5xl" } as EduTextProps,

  // Heading 2 / Bold / 40px 4xl (36) // TODO: 
  h2: { ...$base, size: "$4xl" } as EduTextProps,

  // Heading 3 / Bold / 32px 3xl (30) // TODO: 
  h3: { ...$base, size: "$3xl" } as EduTextProps,

  // Heading 4 / Bold / 24px 2xl
  h4: { ...$base, size: "$2xl" } as EduTextProps,

  // Heading 5 / Bold / 20px xl
  h5: { ...$base, size: "$xl" } as EduTextProps,

  // Heading 6 / Bold / 18px lg
  h6: { ...$base, size: "$lg" } as EduTextProps,
}