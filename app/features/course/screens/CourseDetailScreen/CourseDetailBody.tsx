import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Dimensions,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue
} from "react-native-reanimated"
import { YStack } from "tamagui"
import { CollapsibleHeaderTabView } from "react-native-tab-view-collapsible-header"
import { translate } from "../../../../i18n"
import { goBack } from "../../../../navigators"
import { LessonsTab } from "../LessonListScreen/LessonsTab"
import { AboutTab } from "./AboutTab"
import { ReviewsCourseTab } from "../../../review"
import { SceneMap } from "react-native-tab-view"
import { CourseIntro } from "./CourseIntro"
import { CourseInformation } from "./CourseInformation"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ArrowLeft, EduTabBar, IconButton, IconButtonProps, IconSVG } from "../../../../components"
import { Course } from "../../../../services/student-api"
import { useStores } from "../../../../models"

const G_WIN_HEIGHT = Dimensions.get("window").height
const HEAD_HEIGHT = G_WIN_HEIGHT * 0.7
const FROZE_TOP = 80
const LINE_HEIGHT = 20
const LINE_COUNT = 3
const moveDistance = HEAD_HEIGHT - FROZE_TOP
const detail_h = LINE_HEIGHT * LINE_COUNT

const FirstRoute = () => <AboutTab index={0} />

const SecondRoute = () => <LessonsTab index={1} />

const ThirdRoute = () => <ReviewsCourseTab index={2} />

const renderScene = SceneMap({
  about: FirstRoute,
  lessons: SecondRoute,
  reviews: ThirdRoute,
})

export const CourseDetailBody = observer((props: { course?: Course }) => {
  const layout = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const top = { top: insets["top"] + 8 }
  const [scrollTrans, setScrollTrans] = useState(useSharedValue(0))
  const { courseDetailStore: { course, duration } } = useStores()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: "about", title: `${translate("common.about")}` },
    { key: "lessons", title: `${translate("common.lessons")}` },
    { key: "reviews", title: `${translate("common.reviews")}` },
  ])

  const headerOpacity = useDerivedValue(() => interpolate(
    scrollTrans.value,
    [0, HEAD_HEIGHT - FROZE_TOP],
    [1, 0],
    Extrapolate.CLAMP
  ))

  const headerTransY = useDerivedValue(() => interpolate(
    scrollTrans.value,
    [0, moveDistance],
    [0, (FROZE_TOP - detail_h) * 0.5],
    Extrapolate.CLAMP
  ))

  const headerTransStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: headerTransY.value }],
      opacity: headerOpacity.value,
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

  const {
    name,
    category,
    original_price,
    promotion_price,
    certificate,
  } = props.course ?? {}

  //  style={$header}
  const renderScrollHeader = () => (
    <YStack bg="$background" w="$full" h={HEAD_HEIGHT} als="center">
      <Animated.View style={[$header, headerTransStyle]}>
        <CourseIntro flex={1} w="$full" />
        <CourseInformation
          name={name}
          promotionPrice={promotion_price?.toString()}
          price={original_price?.toString()}
          category={category}
          duration={duration}
          certificate={certificate}
        />
      </Animated.View>
    </YStack>
  )

  return (
    <YStack width="$full" flex={1}>
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
      <Animated.View style={[$backPosition, top]}>
        <BackButton theme="dark" />
      </Animated.View  >

      <Animated.View style={[$backPosition, top, darkBackStyle]}>
        <BackButton />
      </Animated.View>
    </YStack >
  )
})

const $backPosition: StyleProp<ViewStyle> = { left: 8, position: "absolute" }

const $header: StyleProp<ViewStyle> = {
  width: "100%",
  height: HEAD_HEIGHT,
  alignItems: "center",
}

const BackButton = (props: IconButtonProps) => (
  <IconButton
    onPress={goBack}
    bg="$transparent"
    icon={<IconSVG size="$6" as={<ArrowLeft set="light" />} />}
    {...props} />
)

// const whiteBackStyle = useAnimatedStyle(() => {
//   return {
//     transform: [
//       {
//         scale: interpolate(scrollTrans.value,
//           [0, 1],
//           [1, 0],
//           Extrapolate.CLAMP)
//       }
//     ],
//     opacity: interpolate(scrollTrans.value, [0, 300], [1, 0]),
//   }
// })

{/*
<Animated.View style={[$backPosition, top, darkBackStyle]}>
<IconButton onPress={goBack}
icon={<IconSVG size="$6" as={<ArrowLeft set="light" />} />} />
</Animated.View>

<Animated.View style={[$backPosition, top, whiteBackStyle]}>
<IconButton onPress={goBack}
icon={<IconSVG size="$6" color="$background" as={<ArrowLeft set="light" />} />}
/>
</Animated.View>
*/}