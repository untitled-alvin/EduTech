import * as React from "react"
import { Image, ImageProps } from "react-native"
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

type AssetsImageTypes = keyof typeof AssetsImageRegistry

type AssetsImageProps = ImageProps & { image: AssetsImageTypes }

export function AssetsImage(props: AssetsImageProps) {
  const { image, ...rest } = props
  return <Image resizeMode="contain" source={AssetsImageRegistry[image]}  {...rest} />
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
