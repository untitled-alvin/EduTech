import * as React from "react"
import { Image, ImageProps } from "react-native"

export const iconBrandRegistry = {
  american: require("./icons/american.png"),
  apple: require("./icons/apple.png"),
  googleEL: require("./icons/google-el.png"),
  google: require("./icons/google.png"),
  masterCard: require("./icons/master-card.png"),
  paypal: require("./icons/paypal.png"),
  figma: require("./icons/figma.png")
}
export type BrandIconTypes = keyof typeof iconBrandRegistry
export type BrandIconProps = ImageProps & { icon: BrandIconTypes }
export const BrandIcon = ({ icon, ...rest }: BrandIconProps) => (
  <Image resizeMode='contain' source={iconBrandRegistry[icon]} {...rest} />
)