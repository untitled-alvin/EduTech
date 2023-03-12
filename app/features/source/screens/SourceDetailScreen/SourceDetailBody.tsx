import { observer } from "mobx-react-lite"
import { Box, Icon, IconButton } from "native-base"
import React, { useEffect, useState } from "react"
import {
  Dimensions, useWindowDimensions,
  StyleProp,
  ViewStyle, View
} from "react-native"
import Animated, {
  Extrapolate, interpolate, useAnimatedStyle,
  useDerivedValue, useSharedValue
} from "react-native-reanimated"
import {
  CollapsibleHeaderTabView
} from "react-native-tab-view-collapsible-header"
import { ArrowLeft, EduTabBar } from "../../../../components"
import { translate } from "../../../../i18n"
import { useStores } from "../../../../models"
import { goBack } from "../../../../navigators"
import { LessonsTab } from "../LessonListScreen/LessonsTab"
import { AboutTab } from "./AboutTab"
import { ReviewsSourceTab } from "../../../review/ReviewsSourceTab"
import { SceneMap } from "react-native-tab-view"
import { SourceIntro } from "./SourceIntro"
import { SourceInformation } from "./SourceInformation"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const G_WIN_WIDTH = Dimensions.get("window").width
const G_WIN_HEIGHT = Dimensions.get("window").height
// const HEAD_HEIGHT = G_WIN_HEIGHT * 0.6
const HEAD_HEIGHT = G_WIN_HEIGHT * 0.7
const FROZE_TOP = 80
const LINE_HEIGHT = 20
const LINE_COUNT = 3
const moveDistance = HEAD_HEIGHT - FROZE_TOP
const detail_h = LINE_HEIGHT * LINE_COUNT

const FirstRoute = () => <AboutTab index={0} />

const SecondRoute = () => <LessonsTab index={1} />

const ThirdRoute = () => <ReviewsSourceTab index={2} />

const renderScene = SceneMap({
  about: FirstRoute,
  lessons: SecondRoute,
  reviews: ThirdRoute,
});

interface SourceDetailBodyProps { }

export const SourceDetailBody = observer((props: SourceDetailBodyProps) => {
  const layout = useWindowDimensions();
  const insets = useSafeAreaInsets()
  const top = { top: insets["top"] + 8 }

  const { paymentStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [scrollTrans, setScrollTrans] = useState(useSharedValue(0))
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: "about", title: `${translate("common.about")}` },
    { key: "lessons", title: `${translate("common.lessons")}` },
    { key: "reviews", title: `${translate("common.reviews")}` },
  ]);

  const headerOpacity = useDerivedValue(
    () => interpolate(scrollTrans.value,
      [0, HEAD_HEIGHT - FROZE_TOP],
      [1, 0],
      Extrapolate.CLAMP)
  )

  const headerTransY = useDerivedValue(
    () => interpolate(scrollTrans.value,
      [0, moveDistance],
      [0, (FROZE_TOP - detail_h) * 0.5],
      Extrapolate.CLAMP)
  )

  const headerTransStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: headerTransY.value
        },
      ],
      opacity: headerOpacity.value,
    }
  })

  const whiteBackStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scrollTrans.value,
            [0, 1],
            [1, 0],
            Extrapolate.CLAMP)
        }
      ],
      opacity: interpolate(scrollTrans.value, [0, 300], [1, 0]),
    }
  })

  const darkBackStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollTrans.value,
        [0, FROZE_TOP],
        [0, 1],
        Extrapolate.CLAMP
      ),
    }
  })

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    setIsLoading(true)
    await paymentStore.fetchPayments()
    setIsLoading(false)
  }

  const manualRefresh = async () => {
    setRefreshing(true)
    await paymentStore.fetchPayments()
    setRefreshing(false)
  }

  const renderScrollHeader = () => {
    return (
      <View style={$header}>
        <Animated.View style={[$header, headerTransStyle]}>
          <SourceIntro height={"60%"} width="full" />
          <SourceInformation />
        </Animated.View>
      </View>
    )
  }

  return (
    <Box width={"full"} flex={1}>
      <CollapsibleHeaderTabView
        lazy
        frozeTop={FROZE_TOP}
        makeScrollTrans={setScrollTrans}
        enableSnap={true}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={(props) => <EduTabBar {...props} />}
        style={{ width: "100%", height: "100%" }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderScrollHeader={renderScrollHeader}
        {...props}
      />
      <Animated.View style={[$backPosition, top, darkBackStyle]}>
        <IconButton
          borderRadius="full"
          onPress={() => goBack()}
          icon={<Icon color="black" as={<ArrowLeft set="light" />} />}
        />
      </Animated.View  >

      <Animated.View style={[$backPosition, top, whiteBackStyle]}>
        <IconButton
          borderRadius="full"
          onPress={() => goBack()}
          icon={<Icon color="white" as={<ArrowLeft set="light" />} />}
        />
      </Animated.View>
    </Box >
  )
})

const $backPosition: StyleProp<ViewStyle> = { left: 8, position: "absolute" }

const $header: StyleProp<ViewStyle> = {
  backgroundColor: "white",
  width: "100%",
  height: HEAD_HEIGHT,
  alignItems: "center",
}
