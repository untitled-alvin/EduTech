import * as React from "react"
import { Image, ImageProps } from "react-native"

export type AssetsImageProps = ImageProps & { image: keyof typeof AssetsImageRegistry }

export function AssetsImage(props: AssetsImageProps) {
    const { image, ...rest } = props
    return <Image resizeMode="contain" source={AssetsImageRegistry[image]} {...rest} />
}

export const kSourceIntroIMG = require("../../../assets/images/source-intro.png")
export const kUserIMG = require("../../../assets/images/df_avatar.png")
export const kEnrollSuccessIMG = require("../../../assets/images/enroll-success.png")
export const kIndicatorIMG = require("../../../assets/images/indicator.png")
export const kIntroPlayIMG = require("../../../assets/images/intro-play.png")
export const kLetsInIMG = require("../../../assets/images/lets-in.png")
export const kSplash1IMG = require("../../../assets/images/splash-1.png")
export const kSplash2IMG = require("../../../assets/images/splash-2.png")
export const kSplash3IMG = require("../../../assets/images/splash-3.png")
export const kProfileSuccessIMG = require("../../../assets/images/profile-success.png")
export const kCardIMG = require("../../../assets/images/card.png")
export const kLogo = require("../../../assets/images/logo.png")
export const rnrImage1 = require("../../../assets/images/rnr-image-1.png")
export const rnrImage2 = require("../../../assets/images/rnr-image-2.png")
export const rnrImage3 = require("../../../assets/images/rnr-image-3.png")
export const rnrImages = [rnrImage1, rnrImage2, rnrImage3]
export const rnrStrings = [
    "../../../assets/images/rnr-image-1.png",
    "../../../assets/images/rnr-image-2.png",
    "../../../assets/images/rnr-image-3.png"
]

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