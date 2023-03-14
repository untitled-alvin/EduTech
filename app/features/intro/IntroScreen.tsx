import { observer } from "mobx-react-lite"
import { Box, Column, Row, Flex } from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
import React, { FC, useEffect, useRef, useState } from "react"
import { ViewStyle } from "react-native"
import { translate } from "../../i18n"
import { AppStackScreenProps } from "../../navigators"
import { Dot, SplashItem } from "./components"
import { EduButton, EduShadow, Screen } from "../../components";
import { useStores } from "../../models";
import { colors } from "../../components/EduUIKit/theme";

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

  return (
    <Screen safeAreaEdges={["top", "bottom", "left", "right"]} >
      <Column height={"full"} justifyContent="space-between"  >
        <Flex flex={8} >
          <AppIntroSlider
            renderPagination={(_) => <Box height="0"></Box>}
            activeDotStyle={{ ...$dotBase, ...$activeDot }}
            ref={sliderRef}
            renderItem={SplashItem}
            data={slides}
            dotStyle={$dotBase}
            showNextButton={false}
            showDoneButton={false}
            onSlideChange={(index, lastIndex) => setIndex(index)}
          />
        </Flex>

        <Row flex={2} justifyContent='center' alignItems={'center'} >
          <Dot selected={index === 0} />
          <Dot selected={index === 1} />
          <Dot selected={index === 2} />
        </Row>

        <EduShadow preset="button_1">
          {
            isDone ?
              <EduButton
                tx="introScreen.getStarted"
                marginRight={"6"}
                marginLeft={"6"}
                marginBottom={"6"}
                onPress={() => rootStore.completeIntro()}
              />
              :
              <EduButton
                tx="common.next"
                marginRight={"6"}
                marginLeft={"6"}
                marginBottom={"6"}
                onPress={() => {
                  let activeIndex = sliderRef.current.state.activeIndex
                  if (!isDone) {
                    sliderRef.current.goToSlide(activeIndex + 1, true);
                  }
                }}
              />
          }
        </EduShadow>
      </Column >
    </Screen >
  )
})

const $activeDot: ViewStyle = { width: 32, backgroundColor: colors.primary[500] }

const $dotBase: ViewStyle = {
  width: 8,
  height: 8,
  borderRadius: 100,
  marginHorizontal: 3,
  backgroundColor: '#E0E0E0',
}




