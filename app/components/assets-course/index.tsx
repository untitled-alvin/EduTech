import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageProps,
  ImageStyle,
  StyleProp,
  TouchableOpacityProps,
} from "react-native"

export type AssetsCourseTypes = keyof typeof courseRegistry

interface AssetsCourseProps extends ImageProps {
  /**
   * The name of the icon
   */
  icon: AssetsCourseTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function AssetsCourse(props: AssetsCourseProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
  } = props

  return (
    <Image
      style={[
        $imageStyle,
        color && { tintColor: color },
        size && { width: size, height: size },
        $imageStyleOverride,
      ]}
      source={courseRegistry[icon]}
    />
  )
}

export const courseRegistry = {
  "1": require("./images/rectangle-1.png"),
  "2": require("./images/rectangle-2.png"),
  "3": require("./images/rectangle-3.png"),
  "4": require("./images/rectangle-4.png"),
  "5": require("./images/rectangle-5.png"),
  "6": require("./images/rectangle-6.png"),
  "7": require("./images/rectangle-7.png"),
  "8": require("./images/rectangle-8.png"),
  "9": require("./images/rectangle-9.png"),
  "10": require("./images/rectangle-10.png"),
  "11": require("./images/rectangle-11.png"),
  "12": require("./images/rectangle-12.png"),
  "13": require("./images/rectangle-13.png"),
  "14": require("./images/rectangle-14.png"),
  "15": require("./images/rectangle-15.png"),
  "16": require("./images/rectangle-16.png"),
  "17": require("./images/rectangle-17.png"),
  "18": require("./images/rectangle-18.png"),
  "19": require("./images/rectangle-19.png"),
  "20": require("./images/rectangle-20.png"),
  "21": require("./images/rectangle-21.png"),
  "22": require("./images/rectangle-22.png"),
}

export const courseImages = [
  require("./images/rectangle-1.png"),
  require("./images/rectangle-2.png"),
  require("./images/rectangle-3.png"),
  require("./images/rectangle-4.png"),
  require("./images/rectangle-5.png"),
  require("./images/rectangle-6.png"),
  require("./images/rectangle-7.png"),
  require("./images/rectangle-8.png"),
  require("./images/rectangle-9.png"),
  require("./images/rectangle-10.png"),
  require("./images/rectangle-11.png"),
  require("./images/rectangle-12.png"),
  require("./images/rectangle-13.png"),
  require("./images/rectangle-14.png"),
  require("./images/rectangle-15.png"),
  require("./images/rectangle-16.png"),
  require("./images/rectangle-17.png"),
  require("./images/rectangle-18.png"),
  require("./images/rectangle-19.png"),
  require("./images/rectangle-20.png"),
  require("./images/rectangle-21.png"),
  require("./images/rectangle-22.png"),
]

const $imageStyle: ImageStyle = { resizeMode: "contain" }
