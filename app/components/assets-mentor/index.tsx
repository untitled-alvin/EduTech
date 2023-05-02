import * as React from "react"
import {
  Image,
  ImageProps,
  ImageStyle,
} from "react-native"

export type AssetsMentorTypes = keyof typeof mentorRegistry

interface AssetsMentorProps extends ImageProps {
  /**
   * The name of the icon
   */
  icon: AssetsMentorTypes

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
export function AssetsMentor(props: AssetsMentorProps) {
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
      source={mentorRegistry[icon]}
    />
  )
}

export const mentorRegistry = {
  "0": require("./images/Ellipse.png"),
  "1": require("./images/Ellipse-1.png"),
  "2": require("./images/Ellipse-2.png"),
  "3": require("./images/Ellipse-3.png"),
  "4": require("./images/Ellipse-4.png"),
  "5": require("./images/Ellipse-5.png"),
  "6": require("./images/Ellipse-6.png"),
  "7": require("./images/Ellipse-7.png"),
  "8": require("./images/Ellipse-8.png"),
  "10": require("./images/Ellipse-10.png"),
  "11": require("./images/Ellipse-11.png"),
  "12": require("./images/Ellipse-12.png"),
  "13": require("./images/Ellipse-13.png"),
  "14": require("./images/Ellipse-14.png"),
  "15": require("./images/Ellipse-15.png"),
  "16": require("./images/Ellipse-16.png"),
  "17": require("./images/Ellipse-17.png"),
  "18": require("./images/Ellipse-18.png"),
}

export const mentorImages = [
  require("./images/Ellipse.png"),
  require("./images/Ellipse-1.png"),
  require("./images/Ellipse-2.png"),
  require("./images/Ellipse-3.png"),
  require("./images/Ellipse-4.png"),
  require("./images/Ellipse-5.png"),
  require("./images/Ellipse-6.png"),
  require("./images/Ellipse-7.png"),
  require("./images/Ellipse-8.png"),
  require("./images/Ellipse-10.png"),
  require("./images/Ellipse-11.png"),
  require("./images/Ellipse-12.png"),
  require("./images/Ellipse-13.png"),
  require("./images/Ellipse-14.png"),
  require("./images/Ellipse-15.png"),
  require("./images/Ellipse-16.png"),
  require("./images/Ellipse-17.png"),
  require("./images/Ellipse-18.png"),
]

const $imageStyle: ImageStyle = { resizeMode: "contain" }
