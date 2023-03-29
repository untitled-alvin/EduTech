import React from "react"
import { Select, SelectTriggerProps } from "tamagui"
import { ChevronDown } from "../../Iconly"
import { IconSVG, IconSVGProps } from "../SVGIcon"

export type EduSelectTriggerProps = SelectTriggerProps & { status?: keyof typeof $presets }

export const EduSelectTrigger = ({ status, ...rest }: EduSelectTriggerProps) => {
  return <Select.Trigger theme="input"
    iconAfter={<IconSVG as={<ChevronDown set="bold" />} {...$actionPresets[status]} />}
    {...$presets[status]}
    {...rest}
  />
}

const $base: SelectTriggerProps = {
  h: "$12",
  w: "$full",
  bw: "$px",
  // bg: "$inputBackground",
  borderColor: "transparent",
  ai: "center",
  borderRadius: "$3",
  paddingHorizontal: "$3",
  pressStyle: { borderColor: "transparent", backgroundColor: "$backgroundPress" }
}

const $presets = {
  empty: { ...$base, color: "$greyscale500" } as SelectTriggerProps,
  filled: { ...$base } as SelectTriggerProps,
  error: { ...$base, borderColor: "$statusError" } as SelectTriggerProps,
}

const $action: IconSVGProps = { size: "$4" }

const $actionPresets = {
  empty: { ...$action, color: "$greyscale500" } as IconSVGProps,
  filled: { ...$action } as IconSVGProps,
  error: { ...$action, color: "$statusError" } as IconSVGProps,
}

