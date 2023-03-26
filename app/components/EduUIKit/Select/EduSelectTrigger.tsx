import React from "react"
import { Select, SelectTriggerProps } from "tamagui"
import { ChevronDown } from "../../Iconly"
import { IconSVG, IconSVGProps } from "../SVGIcon"

export type EduSelectTriggerProps = SelectTriggerProps & { status?: keyof typeof $presets }

export const EduSelectTrigger = ({ status, ...rest }: EduSelectTriggerProps) => {
  return <Select.Trigger
    {...$presets[status]}
    iconAfter={<IconSVG as={<ChevronDown set="bold" />} {...$actionPresets[status]} />}
    {...rest}
  />
}

const $base: SelectTriggerProps = {
  h: "$12",
  w: "$full",
  bw: "$px",
  bg: "$greyscale200",
  ai: "center",
  borderRadius: "$3",
  paddingHorizontal: "$3",
}

const $presets = {
  empty: { ...$base, borderColor: "$greyscale200" } as SelectTriggerProps,
  error: { ...$base, borderColor: "$statusError" } as SelectTriggerProps,
  filled: { ...$base, borderColor: "$greyscale200" } as SelectTriggerProps,
}

const $action: IconSVGProps = { size: "$4" }

const $actionPresets = {
  empty: { ...$action, color: "$greyscale500" } as IconSVGProps,
  error: { ...$base, color: "$statusError" } as IconSVGProps,
  filled: { ...$base, color: "$greyscale900" } as IconSVGProps,
}

