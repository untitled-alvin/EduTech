import React from "react"
import { OpaqueColorValue } from "react-native";
import { ColorTokens, SizeTokens, ThemeValueFallback, XStack, YStack, YStackProps } from "tamagui";

export type SeparatorProps = Omit<YStackProps, ""> & {
  color?: ThemeValueFallback | ColorTokens | OpaqueColorValue
  stroke?: SizeTokens | ThemeValueFallback
  full?: boolean
  vertical?: boolean
}

export const Separator = ({
  color = "$divider",
  stroke = "$px",
  vertical = false,
  full = true, ...rest
}: SeparatorProps) => {
  return vertical ?
    <YStack w={stroke} bg={color} als={full ? "stretch" : "auto"} {...rest} /> :
    <XStack h={stroke} bg={color} als={full ? "stretch" : "auto"} {...rest} />
}

