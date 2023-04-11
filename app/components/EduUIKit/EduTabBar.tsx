import React from "react"
import { TabBar } from "react-native-tab-view";
import { EduBody } from "./Typography/EduBody";
import { ViewStyle } from "react-native";
import { YStack } from "tamagui";
import { getNativeColor } from "../../utils/getColorValue";

export const EduTabBar = (props) => {
  const $divider = getNativeColor("$divider")
  const $primary500 = getNativeColor("$primary500")
  const $greyscale500 = getNativeColor("$greyscale500")

  return (
    <YStack bg="$background" paddingHorizontal="$6" >
      <TabBar
        activeColor={$primary500}
        inactiveColor={$greyscale500}
        renderLabel={({ route, focused, color }) => (
          <EduBody size="xl" weight="semibold" text={route.title} color={color} />
        )}
        indicatorStyle={[$indicator, { backgroundColor: $primary500 }]}
        style={[$tabBar, { borderColor: $divider }]}
        {...props}
      />
    </YStack >
  )
}

const $tabBar: ViewStyle = {
  elevation: 0,
  borderBottomWidth: 2,
  backgroundColor: 'transparent'
}

const $indicator: ViewStyle = {
  height: 4,
  borderRadius: 100,
  bottom: -2,
}
