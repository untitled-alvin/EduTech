import React from "react"
import { OpaqueColorValue } from "react-native";
import { ColorTokens, SizeTokens, ThemeValueFallback, XStack, YStack, YStackProps } from "tamagui";

export type EduSeparatorProps = Omit<YStackProps, ""> & {
  color?: ThemeValueFallback | ColorTokens | OpaqueColorValue
  stroke?: SizeTokens | ThemeValueFallback
  vertical?: boolean
  full?: boolean
}

export function EduSeparator({
  color = "$divider",
  stroke = "$px",
  vertical = false,
  full = true, ...rest
}: EduSeparatorProps) {
  return vertical ?
    <YStack w={stroke} bg={color} als={full ? "stretch" : "auto"} {...rest} /> :
    <XStack h={stroke} bg={color} als={full ? "stretch" : "auto"} {...rest} />
}

