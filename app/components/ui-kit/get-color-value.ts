import { ColorValue, OpaqueColorValue } from "react-native"
import { ColorTokens, ThemeValueFallback, getTokens, getVariableValue, useTheme } from "tamagui"

export function getColorValue(
  color: ThemeValueFallback | ColorTokens | OpaqueColorValue | ColorValue
) {
  const theme = useTheme()
  if (typeof color === 'string') {
    if (color in theme) {
      return getVariableValue(theme[color])
    }
    return getVariableValue(getTokens().color[color] || color)
  }

  return color
}
