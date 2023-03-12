import React from "react"
import { AssetsImage } from "../../../../components"
import { Button, Center, IBoxProps } from "native-base"
import { navigate } from "../../../../navigators"

interface SourceIntroProps extends IBoxProps { }

export function SourceIntro(props: SourceIntroProps) {
  return (
    <Center {...props}>
      <AssetsImage image="sourceIntro"
        height={"full"}
        resizeMode="cover"
        width="full" flex={1} />
      <AssetsImage alignSelf="center" position="absolute" image="introPlay" />
      <Button
        height={"full"}
        width={"full"}
        // zIndex={9999}
        borderRadius="none"
        variant={"ghost"}
        position="absolute"
        onPress={() => navigate("SourcePlay")}
      />
    </Center>
  )
}
