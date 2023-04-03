import * as React from "react"
import { Image, ImageProps } from "react-native"

export type IconBrandTypes = keyof typeof iconBrandRegistry
export type IconBrandProps = ImageProps & { icon: IconBrandTypes }
export const IconBrand = ({ icon, ...rest }: IconBrandProps) => (
  <Image resizeMode='contain' source={iconBrandRegistry[icon]} {...rest} />)
export const iconBrandRegistry = {
  american: require("../../assets/icons-brand/american.png"),
  apple: require("../../assets/icons-brand/apple.png"),
  googleEL: require("../../assets/icons-brand/google-el.png"),
  google: require("../../assets/icons-brand/google.png"),
  masterCard: require("../../assets/icons-brand/master-card.png"),
  paypal: require("../../assets/icons-brand/paypal.png"),
  figma: require("../../assets/icons-brand/figma.png")
}