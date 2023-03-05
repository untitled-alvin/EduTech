import React from 'react'
import { StyleSheet } from 'react-native'
import {
  IndicatorProps
} from 'react-native-collapsible-tab-view/lib/typescript/src/MaterialTabBar/types'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated'
import { isRTL } from '../../../../i18n'
import { colors } from '../../../../components/EduUIKit/theme'


interface CustomIndicatorProps extends IndicatorProps {
  marginHorizontal?: number,
}

const Indicator: React.FC<CustomIndicatorProps> = ({
  indexDecimal,
  itemsLayout,
  style,
  fadeIn = false,
  marginHorizontal = 0,
}) => {
  const opacity = useSharedValue(fadeIn ? 0 : 1)

  const stylez = useAnimatedStyle(() => {
    const transform =
      itemsLayout.length > 1
        ? [
          {
            translateX: interpolate(
              indexDecimal.value,
              itemsLayout.map((_, i) => i),
              // itemsLayout.map((_, i) => i - 24),
              // when in RTL mode, the X value should be inverted
              // itemsLayout.map((_, i) => {
              //   if (i === 0)
              //     return i + 24
              //   else if (i === (itemsLayout.length - 1))
              //     return i - 24
              //   else
              //     return i
              // }),

              itemsLayout.map((v, i) => {
                if (i === 0)
                  return (isRTL ? -1 * v.x : v.x) + marginHorizontal
                else if (i === (itemsLayout.length - 1))
                  return (isRTL ? -1 * v.x : v.x)
                else
                  return (isRTL ? -1 * v.x : v.x)
              })
            ),
          },
        ]
        : undefined

    const width =
      itemsLayout.length > 1
        ? interpolate(
          indexDecimal.value,
          itemsLayout.map((_, i) => i),
          itemsLayout.map((v, i) => {
            if (i === 0)
              return v.width - marginHorizontal
            else if (i === (itemsLayout.length - 1))
              return v.width - marginHorizontal
            // return v.width
            else
              return v.width
          })
        )
        : itemsLayout[0]?.width

    return {
      transform,
      width,
      opacity: withTiming(opacity.value),
    }
  }, [indexDecimal, itemsLayout])

  React.useEffect(() => {
    if (fadeIn) {
      opacity.value = 1
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fadeIn])

  return <Animated.View style={[stylez, styles.indicator, style]} />
}

const styles = StyleSheet.create({
  indicator: {
    height: 4,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 0,
    borderRadius: 100,
  },
})

export { Indicator as CustomIndicator }