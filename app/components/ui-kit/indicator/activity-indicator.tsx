import React from "react"
import { ViewStyle } from "react-native";
import { Square, SquareProps } from "tamagui";
import AnimatedLottieView from "lottie-react-native";
import { AnimatedLottieViewProps } from "lottie-react-native/lib/typescript/LottieView.types";

type Presets = keyof typeof $animations

export type ActivityIndicatorProps =
  { type?: Presets }
  & Omit<SquareProps, ''>
  & Omit<AnimatedLottieViewProps, 'source'>

export const ActivityIndicator = ({ type = "1", size = "$7", ...rest }: ActivityIndicatorProps) => (
  <Square als="center" size={size} marginVertical="$4" {...rest}>
    <AnimatedLottieView autoPlay loop style={$sourceStyle} {...$animations[type]} />
  </Square>
)

const $sourceStyle: ViewStyle = { width: "100%", height: "100%" }
const $animation1 = require("./progressAnim.json")
const $animation2 = require("./progressAnim2.json")
const $animation3 = require("./progressAnim3.json")
const $animations = {
  "1": { source: $animation1 } as AnimatedLottieViewProps,
  "2": { source: $animation2, speed: 2.5 } as AnimatedLottieViewProps,
  "3": { source: $animation3, speed: 2 } as AnimatedLottieViewProps,
}



