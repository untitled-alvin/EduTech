import React from "react"
import { observer } from "mobx-react-lite"
import AppIntroSlider from "react-native-app-intro-slider";
import { Dimensions, ViewStyle } from "react-native"
import { translate } from "../../../i18n"
import { Body, Heading } from "../../../components";
import { Theme, XStack, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

const SCREEN_HEIGHT = Dimensions.get("window").height
const HEIGHT = SCREEN_HEIGHT * 0.34

const offers = [
  {
    key: "1",
    title: translate("introScreen.mess1"),
  },
  {
    key: "2",
    title: translate("introScreen.mess2"),
  },

  {
    key: "3",
    title: translate("introScreen.mess3"),
  },
  {
    key: "4",
    title: translate("introScreen.mess3"),
  },
];


export const OfferSlider = observer((props) => {
  return (
    <AppIntroSlider
      style={$slider}
      activeDotStyle={{ ...$dotBase, ...$activeDot }}
      renderItem={OfferCard}
      data={offers}
      dotStyle={$dotBase}
      showNextButton={false}
      showDoneButton={false}
    />
  )
})


export function OfferCard({ item }) {
  const sub = "Get a discount for every course order! Only valid for today!"

  return (
    <Theme name="primary">
      <YStack flex={1} pb="$8" pt="$4" paddingHorizontal="$6" >
        <LinearGradient flex={1} br="$8" end={[0, 0]} start={[0, 1]} colors={["#335EF7", "#5F82FF"]}>
          <YStack flex={1} p="$8" style={$shadow} >
            <YStack flex={1} w="$full" space="$4" jc="space-evenly">
              <XStack space="$4" jc="space-between" >
                <YStack space="$2">
                  <Body weight="semibold" text="40% OFF" />
                  <Heading preset="h4" numberOfLines={2} text="Today's Special" />
                </YStack>
                <Heading preset="h1" numberOfLines={1} text="40%" />
              </XStack>
              <Body size="large" numberOfLines={2} text={sub} />
            </YStack>
          </YStack>
        </LinearGradient>
      </YStack>
    </Theme>
  )
}

const $slider: ViewStyle = { height: HEIGHT }

const $activeDot: ViewStyle = { width: 16, backgroundColor: "white" }

const $dotBase: ViewStyle = {
  width: 4,
  height: 4,
  borderRadius: 100,
  marginHorizontal: 2,
  backgroundColor: "#E0E0E0",
}

const $shadow: ViewStyle = {
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 9 },
  shadowOpacity: 0.22,
  shadowRadius: 10.24,
  elevation: 12
}




