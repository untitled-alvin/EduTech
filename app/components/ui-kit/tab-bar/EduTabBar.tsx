import React from "react"
import { TabBar } from "react-native-tab-view";
import { Body } from "../typography/Body";
import { ViewStyle } from "react-native";
import { YStack } from "tamagui";
import { getColorValue } from "../get-color-value";

export const EduTabBar = (props) => {
  const $divider = getColorValue("$divider")
  const $primary500 = getColorValue("$primary500")
  const $greyscale500 = getColorValue("$greyscale500")

  return (
    <YStack bg="$background" paddingHorizontal="$6" >
      <TabBar
        activeColor={$primary500}
        inactiveColor={$greyscale500}
        renderLabel={({ route, focused, color }) => (
          <Body size="xl" weight="semibold" text={route.title} color={color} />
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
