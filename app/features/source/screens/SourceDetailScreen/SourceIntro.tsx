import React from "react"
import { AssetsImage } from "../../../../components"
import { navigate } from "../../../../navigators"
import { YStack, ZStack, YStackProps, Button } from "tamagui"
import { ImageStyle } from "react-native"

interface SourceIntroProps extends YStackProps { }

export function SourceIntro(props: SourceIntroProps) {
  return (
    <ZStack alignItems="center" {...props}>

      <YStack flex={1} w="$full" h="$full"  >
        <AssetsImage resizeMode="cover" image="sourceIntro" style={$img} />
      </YStack>
      <YStack flex={1} ai="center" jc="center" ><AssetsImage image="introPlay" /></YStack>
      <Button h="$full" w="$full" zIndex={9999} position="absolute"
        backgroundColor="transparent"
        pressStyle={{ backgroundColor: "$primary500", o: 0.2 }}
        onPress={() => navigate("SourcePlay")}
      />
    </ZStack>
  )
}

const $img: ImageStyle = { width: "100%", height: "100%" }

{/* <AssetsImage image="sourceIntro"
        height={"full"}
        resizeMode="cover"
        width="full" flex={1} /> */}

{/* <AssetsImage alignSelf="center" position="absolute" image="introPlay" /> */ }