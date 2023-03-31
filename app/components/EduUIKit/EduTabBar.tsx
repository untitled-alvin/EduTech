import React from "react"
import { TabBar } from "react-native-tab-view";
import { EduBody } from "./Typography/EduBody";
import { colors } from "./theme";
import { ViewStyle } from "react-native";
import { getVariableValue, useTheme, YStack } from "tamagui";

export const EduTabBar = (props) => {
  const theme = useTheme()
  const $divider = getVariableValue(theme["$divider"])

  return (
    <YStack bg="$background" paddingHorizontal="$6" >
      <TabBar
        activeColor={colors.primary[500]}
        inactiveColor={colors.greyscale[500]}
        renderLabel={({ route, focused, color }) => (
          <EduBody size="xl" weight="semibold" text={route.title} color={color} />
        )}
        indicatorStyle={$indicator}
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
  backgroundColor: colors.primary[500],
  bottom: -2,
}
