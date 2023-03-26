import React from "react"
import { TabBar } from "react-native-tab-view";
import { EduBody } from "./Typography/EduBody";
import { colors } from "./theme";
import { ViewStyle } from "react-native";
import { YStack } from "tamagui";

export function EduTabBar(props) {
  return (
    <YStack backgroundColor="white" paddingHorizontal="$6" >
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
    </YStack >
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
