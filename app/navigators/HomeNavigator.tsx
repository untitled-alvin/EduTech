import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Home, User } from "../components"
import { colors, spacing } from "../components/EduUIKit/theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { translate } from "../i18n"
import { HomeScreen } from "../features/home"
import { ProfileScreen } from "../features/auth"
import { getVariableValue, useTheme } from "tamagui"

export type HomeTabParamList = {
  Home: undefined
  Profile: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<HomeTabParamList>()

export function HomeNavigator() {
  const { bottom } = useSafeAreaInsets()
  const theme = useTheme()
  const background = getVariableValue(theme["$background"])

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 62, backgroundColor: background }],
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      {/* <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: translate("common.home"),
          tabBarIcon: ({ focused }) => <IconSVG
            as={focused ? <Home set="bold" /> : <Home set="light" />}
            color={focused ? "$primary500" : "greyscale500"}
          />
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // tabBarLabelStyle: $tabBarLabel,
          tabBarLabel: translate("common.profile"),
          tabBarIcon: ({ focused }) => <IconSVG
            as={focused ? <User set="bold" /> : <User set="light" />}
            color={focused ? "$primary500" : "greyscale500"}
          />
        }}
      />  */}

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: translate("common.home"),
          tabBarIcon: ({ focused }) => {
            return focused ?
              <Home set="bold" color={colors.primary[500]} /> :
              <Home set="light" color={colors.greyscale[500]} />
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // tabBarLabelStyle: $tabBarLabel,
          tabBarLabel: translate("common.profile"),
          tabBarIcon: ({ focused }) => {
            return focused ?
              <User set="bold" color={colors.primary[500]} /> :
              <User set="light" color={colors.greyscale[500]} />
          },
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  borderTopColor: colors.transparent,
  // paddingBottom: spacing.extraSmall,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.small,
}

const $tabBarLabel: TextStyle = {
  fontSize: 10,
  lineHeight: 12,
  // fontWeight: "bold"
}
