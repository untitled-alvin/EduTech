import React from "react"
import { AssetsImage, EduHeading } from "../../components";
import { YStack } from "tamagui";

export function Dot({ selected }) {
  return <YStack
    width={selected ? "$8" : "$2"}
    height="$2"
    marginHorizontal="$0.5"
    borderRadius={100}
    backgroundColor={selected ? "$primary500" : "$greyscale300"}
  />
}

export function SplashItem({ item }) {
  const { title, image } = item;

  return (
    <YStack jc="flex-start" paddingHorizontal="$10" flex={1}>
      <YStack
        marginTop="$6"
        h="$2/3"
        w="$2/3"
        jc="flex-start" >
        <AssetsImage image={image} resizeMode="cover" />
      </YStack>

      <YStack h="$4" />
      <EduHeading text={title} preset="h2" textAlign="center" />
    </YStack>
  )
}