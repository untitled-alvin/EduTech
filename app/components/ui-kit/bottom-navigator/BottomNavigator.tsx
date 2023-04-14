import React from "react"
import { ExtendedEdge, useSafeAreaInsetsStyle } from "../../../utils/useSafeAreaInsetsStyle";
import { YStack, YStackProps } from "tamagui";

export type BottomNavigatorProps = YStackProps & {
  /**
  * Override the default edges for the safe area.
  */
  safeAreaEdges?: ExtendedEdge[]
}

export function BottomNavigator(props: BottomNavigatorProps) {
  const { style, safeAreaEdges, ...rest } = props;
  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

  return <YStack w="$full" position="absolute" b="$0" l="$0" r="$0"
    paddingVertical="$2"
    paddingHorizontal="$6"
    style={[$containerInsets, style]}
    {...rest}
  />
}

