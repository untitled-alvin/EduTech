import * as React from "react"
import { Image, IImageProps } from 'native-base';
import {
  kCardIMG,
  kEnrollSuccessIMG,
  kIndicatorIMG,
  kIntroPlayIMG,
  kLetsInIMG,
  kLogo,
  kProfileSuccessIMG,
  kSourceIntroIMG,
  kSplash1IMG,
  kSplash2IMG,
  kSplash3IMG,
  kUserIMG
} from "./AssetsImageSources";

export type AssetsImageTypes = keyof typeof AssetsImageRegistry

interface AssetsImageProps extends IImageProps {
  /**
   * The name of the image
   */
  image: AssetsImageTypes
}

export function AssetsImage(props: AssetsImageProps) {
  const { image, ...rest } = props

  return (
    <Image
      resizeMode='contain'
      alt={`App Image ${image}`}
      source={AssetsImageRegistry[image]}
      {...rest}
    />
  )
}

export const AssetsImageRegistry = {
  sourceIntro: kSourceIntroIMG,
  user: kUserIMG,
  enrollSuccess: kEnrollSuccessIMG,
  indicator: kIndicatorIMG,
  introPlay: kIntroPlayIMG,
  letsIn: kLetsInIMG,
  splash1: kSplash1IMG,
  splash2: kSplash2IMG,
  splash3: kSplash3IMG,
  profileSuccess: kProfileSuccessIMG,
  card: kCardIMG,
  logo: kLogo,
}

export * from "./AssetsImageSources"
