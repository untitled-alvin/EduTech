import React from "react"
import { ChevronDown } from "../../Iconly"
import { IconSVG, IconSVGProps } from "../icon/SVGIcon"

export type EduSelectTriggerIconProps = IconSVGProps & { status?: keyof typeof $presets }

export const EduSelectTriggerIcon = ({ status, ...rest }: EduSelectTriggerIconProps) => {
  return <IconSVG as={<ChevronDown set="bold" />}
    {...$presets[status]}
    {...rest}
  />
}

const $base: IconSVGProps = { size: "$4", color: "$greyscale900" }

const $presets = {
  empty: { ...$base, color: "$greyscale500" } as IconSVGProps,
  error: { ...$base, color: "$statusError" } as IconSVGProps,
  filled: { ...$base, color: "$greyscale900" } as IconSVGProps,
}
