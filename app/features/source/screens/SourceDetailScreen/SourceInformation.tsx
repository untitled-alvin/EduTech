import React from "react"
import {
  Body,
  Heading, People,
  Star, Tag, TimeCircle, Document, IconSVG
} from "../../../../components"
import { XStack, YStack } from "tamagui"
import { translate } from "../../../../i18n"

interface SourceInformationProps { }

export const SourceInformation = (props: SourceInformationProps) => {
  return (
    <YStack w="$full">
      <Heading
        preset="h3"
        marginVertical="$4"
        marginHorizontal="$6"
        numberOfLines={1}
        text="Intro to UI/UX Design"
      />
      <XStack marginHorizontal="$6" >
        <Tag text="UI/UX Design" />
        <YStack w="$4" />
        <XStack space="$2">
          <IconSVG color="#FB9400" size="$4" as={<Star set="bulk" />} />
          <Body size="large" numberOfLines={1} text="4.8 (4,479 reviews)" />
        </XStack>
      </XStack>

      <YStack h="$2" />
      <XStack marginHorizontal="$6" ai="center" space="$2" >
        <Heading
          preset="h3"
          color="$primary500"
          numberOfLines={1}
          text="$40" />
        <Heading
          preset="h5"
          textDecorationLine="line-through"
          color="$greyscale500"
          numberOfLines={1} text="$75" />
      </XStack>

      <YStack h="$2" />
      <XStack marginHorizontal="$6" jc="space-between">
        <XStack ai="center" space="$1.5">
          <IconSVG size="$4" color="$primary500" as={<People set="bold" />} />
          <Body size="large" numberOfLines={1} text={`9,839 ${translate("common.students")}`} />
        </XStack>

        <XStack ai="center" space="$1.5">
          <IconSVG size="$4" color="$primary500" as={<TimeCircle set="bold" />} />
          <Body size="large" numberOfLines={1} text={`2,5 ${translate("common.hours")}`} />
        </XStack>

        <XStack ai="center" space="$1.5">
          <IconSVG size="$4" color="$primary500" as={<Document set="bold" />} />
          <Body size="large" numberOfLines={1} tx="common.certificate" />
        </XStack>
      </XStack>
      <YStack h="$2" />
    </YStack>
  )
}
