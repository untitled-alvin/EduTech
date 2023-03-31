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
    <YStack jc="center" ai="center" paddingHorizontal="$10" space="$6" flex={1}>
      <AssetsImage image={image} style={{ flex: 2 }} />

      <EduHeading text={title} preset="h2" textAlign="center" />
    </YStack>
  )
}