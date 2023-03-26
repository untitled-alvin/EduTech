import { observer } from "mobx-react-lite"
import AppIntroSlider from "react-native-app-intro-slider";
import React, { FC, useEffect, useRef, useState } from "react"
import { ViewStyle } from "react-native"
import { translate } from "../../i18n"
import { AppStackScreenProps } from "../../navigators"
import { Dot, SplashItem } from "./components"
import { EduButton, EduShadow, Screen } from "../../components";
import { useStores } from "../../models";
import { colors } from "../../components/EduUIKit/theme";
import { XStack, YStack } from "tamagui";

const slides = [
  {
    key: "1",
    image: "splash1",
    title: translate("introScreen.mess1"),
  },
  {
    key: "2",
    image: "splash2",
    title: translate("introScreen.mess2"),
  },

  {
    key: "3",
    image: "splash3",
    title: translate("introScreen.mess3"),
  },
];

interface IntroScreenProps extends AppStackScreenProps<"Intro"> { }

export const IntroScreen: FC<IntroScreenProps> = observer(function IntroScreen(_props) {
  const rootStore = useStores()
  const sliderRef = useRef<AppIntroSlider>(null);
  const [index, setIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    setIsDone(index === 2);
  }, [index])

  const next = () => !isDone ? sliderRef.current.goToSlide(index + 1, true) : null

  return (
    <Screen safeAreaEdges={["top", "bottom", "left", "right"]} >
      <YStack h={"100%"} jc="space-between"  >
        <YStack w="$full" flex={9} >
          <AppIntroSlider
            renderPagination={(_) => <YStack height="$0" />}
            activeDotStyle={{ ...$dot, ...$activeDot }}
            ref={sliderRef}
            renderItem={SplashItem}
            data={slides}
            dotStyle={$dot}
            showNextButton={false}
            showDoneButton={false}
            onSlideChange={(index, lastIndex) => setIndex(index)}
          />
        </YStack>

        <XStack flex={2} jc="center" ai="center" >
          <Dot selected={index === 0} />
          <Dot selected={index === 1} />
          <Dot selected={index === 2} />
        </XStack>
        {
          isDone ?
            <EduShadow preset="button_1">
              <EduButton full tx="introScreen.getStarted"
                marginHorizontal="$5"
                onPress={() => rootStore.completeIntro()}
              />
            </EduShadow>
            :
            <EduShadow preset="button_1">
              <EduButton full tx="common.next"
                onPress={next}
                marginHorizontal="$5"
              />
            </EduShadow>
        }
        <YStack h="$5" />
      </YStack >
    </Screen >
  )
})

const $activeDot: ViewStyle = { width: 32, backgroundColor: colors.primary[500] }

const $dot: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 100,
  marginHorizontal: 3,
  backgroundColor: "#E0E0E0",
}




