import React from "react"
import { ArrowLeft, } from "../../../../components"
import { Icon, IconButton, View } from "native-base"
import { useCurrentTabScrollY, useHeaderMeasurements } from "react-native-collapsible-tab-view"
import { LessonIntro } from "./LessonIntro"
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated"
import { Dimensions, StyleSheet } from 'react-native'
import { SourceInformation } from "./SourceInformation"
import { goBack } from "../../../../navigators"

// const MIN_HEADER_HEIGHT = 48
export const MIN_HEADER_HEIGHT = 90
// export const HEADER_HEIGHT =  350
export const HEADER_HEIGHT = Math.round(Dimensions.get('window').height / 2)

interface ScreenHeaderProps { }

export const ScreenHeader = (props: ScreenHeaderProps) => {
  const { top, height } = useHeaderMeasurements()
  const scrollY = useCurrentTabScrollY()

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        // {
        //   scale: interpolate(scrollY.value, [0, 280], [1, 0]),
        // },
        {
          // translateY: withSpring(-scrollY.value * 0.1),
          // translateY: interpolate(
          //   top.value,
          //   [0, -(height.value || 0 - MIN_HEADER_HEIGHT)],
          //   [0, -MIN_HEADER_HEIGHT]
          // ),
          translateY: interpolate(
            top.value,
            [0, -(height.value || 0 - MIN_HEADER_HEIGHT)],
            [0, (height.value || 0 - MIN_HEADER_HEIGHT) / 20]
          ),
          // translateY: interpolate(
          //   top.value,
          //   [0, -(height.value || 0 - MIN_HEADER_HEIGHT)],
          //   [0, (height.value || 0 - MIN_HEADER_HEIGHT) / 2]
          // ),
        },
      ],
      opacity: interpolate(
        scrollY.value,
        [0, 300],
        [1, 0],
        Extrapolate.CLAMP
      ),
    }
  })

  const backContainerAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            top.value,
            [0, -(MIN_HEADER_HEIGHT - 50)],
            [MIN_HEADER_HEIGHT - 50, (MIN_HEADER_HEIGHT - 50) * 2]
          ),
        }
      ],
    }
  })

  const whiteBackStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 300], [1, 0]),
    }
  })

  const darkBackStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        top.value,
        [0, -MIN_HEADER_HEIGHT],
        [0, 1],
        Extrapolate.CLAMP
      ),
    }
  })

  return (
    <View style={[styles.root]}>
      <Animated.View style={[styles.container, style]}>
        <LessonIntro height="80" width="full" />
        <SourceInformation />
      </Animated.View>

      <Animated.View style={[styles.backContainer, backContainerAnimation, darkBackStyle]}>
        <IconButton
          borderRadius="full"
          onPress={() => goBack()}
          icon={<Icon color="black" as={<ArrowLeft set="light" />} />}
        />
      </Animated.View  >

      <Animated.View style={[styles.backContainer, backContainerAnimation, whiteBackStyle]}>
        <IconButton
          borderRadius="full"
          onPress={() => goBack()}
          icon={<Icon color="white" as={<ArrowLeft set="light" />} />}
        />
      </Animated.View  >
    </View >
  )
}

const styles = StyleSheet.create({
  root: {
    // backgroundColor: '#2196f3',
    // justifyContent: 'flex-end',
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 16,
    // height: 600,
  },
  container: {
    // height: MIN_HEADER_HEIGHT,
    width: '100%',
  },
  backContainer: { position: "absolute", left: 8 },
})
