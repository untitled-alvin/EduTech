import React from "react"
import { Box } from 'native-base';
import { TabBar } from "react-native-tab-view";
import { EduBody } from "./Typography/EduBody";
import { colors } from "./theme";
import { ViewStyle } from "react-native";

export function EduTabBar(props) {
  return (
    <Box bg="white" paddingLeft={6} paddingRight={6} >
      <TabBar
        {...props}
        activeColor={colors.primary[500]}
        inactiveColor={colors.greyscale[500]}
        renderLabel={({ route, focused, color }) => (
          <EduBody sizeT="xl" type="semibold" text={route.title} color={color} />
        )}
        indicatorStyle={$indicator}
        style={$tabBar}
      />
    </Box>
  )
}

const $tabBar: ViewStyle = {
  elevation: 0,
  borderBottomWidth: 2,
  borderColor: "#EEEEEE",
  backgroundColor: 'transparent'
}

const $indicator: ViewStyle = {
  height: 4,
  borderRadius: 100,
  backgroundColor: colors.primary[500],
  bottom: -1,
}
