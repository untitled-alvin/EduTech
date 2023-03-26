import React from "react"
import { observer } from "mobx-react-lite"
import AppIntroSlider from "react-native-app-intro-slider";
import { Dimensions, ViewStyle } from "react-native"
import { translate } from "../../../i18n"
import { EduBody, EduHeading } from "../../../components";
import { XStack, YStack } from "tamagui";

const G_WIN_HEIGHT = Dimensions.get("window").height
const HEAD_HEIGHT = G_WIN_HEIGHT * 0.32

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


export const OfferSlider = observer(function OfferSlider(props) {
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
  return (
    <YStack flex={1} pb="$8" pt="$4" paddingHorizontal="$6" >
      <YStack flex={1} w="$full" br="$8" p="$8" bc="$primary500" style={$shadow} >
        <YStack w="$full" space="$4" jc="space-between">
          <XStack space="$4" jc="space-between" >
            <YStack space="$2">
              <EduBody color="white" type="semibold" text="40% OFF" />
              <EduHeading preset="h4" color="white" numberOfLines={2} text="Today's Special" />
            </YStack>
            <EduHeading preset="h1" color="white" numberOfLines={1} text="40%" />
          </XStack>
          <EduBody
            color="white"
            sizeT="large"
            numberOfLines={2}
            text="Get a discount for every course order! Only valid for today!"
          />
        </YStack>
      </YStack>
    </YStack>
  )
}

const $slider: ViewStyle = {
  height: HEAD_HEIGHT
}

const $activeDot: ViewStyle = {
  width: 16, backgroundColor: "white",
}

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




