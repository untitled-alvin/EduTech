import React from "react"
import { ExtendedEdge, useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";
import { YStack, YStackProps } from "tamagui";

export type BottomNavigatorProps = YStackProps & {
  /**
  * Override the default edges for the safe area.
  */
  safeAreaEdges?: ExtendedEdge[]
}

export function BottomNavigator(props: BottomNavigatorProps) {
  const { style, safeAreaEdges, ...rest } = props;
  // const $containerInsets = useSafeAreaInsetsStyle(["bottom"])
  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

  return (
    <YStack
      bottom="$0"
      left="$0"
      right="$0"
      // safeAreaBottom={10}
      position="absolute"
      width="$full"
      // backgroundColor=""
      paddingVertical="$2"
      paddingHorizontal="$6"
      style={[$containerInsets, style]}
      {...rest}
    />
  )
}

