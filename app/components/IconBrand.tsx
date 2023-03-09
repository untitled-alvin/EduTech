import * as React from "react"

import { Image, IImageProps } from 'native-base';

export type IconBrandTypes = keyof typeof iconBrandRegistry

interface IconBrandProps extends IImageProps {
  /**
   * The name of the icon
   */
  icon: IconBrandTypes
}

// size = '6',
export function IconBrand(props: IconBrandProps) {
  const { icon, ...rest } = props

  return (
    <Image
      alt={`Icon Brand ${icon}`}
      resizeMode='contain'
      source={iconBrandRegistry[icon]}
      {...rest}
    />
  )
}

export const iconBrandRegistry = {
  american: require("../../assets/icons-brand/american.png"),
  apple: require("../../assets/icons-brand/apple.png"),
  googleEL: require("../../assets/icons-brand/google-el.png"),
  google: require("../../assets/icons-brand/google.png"),
  masterCard: require("../../assets/icons-brand/master-card.png"),
  paypal: require("../../assets/icons-brand/paypal.png"),
  figma: require("../../assets/icons-brand/figma.png"),
}
