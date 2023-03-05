import React from "react"
import { Box, IBoxProps } from 'native-base';
import { ExtendedEdge, useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle";

export interface BottomNavigatorProps extends IBoxProps {
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
    <Box
      bottom="0"
      left="0"
      right="0"
      // safeAreaBottom={10}
      position="absolute"
      width="full"
      bg="white"
      paddingTop="2"
      paddingBottom="2"
      paddingRight="6"
      paddingLeft="6"
      style={[$containerInsets, style]}
      {...rest}
    />
  )
}

