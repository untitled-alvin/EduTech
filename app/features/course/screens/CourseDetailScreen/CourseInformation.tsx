import React from "react"
import {
  Body,
  Heading, People,
  Star, Tag, TimeCircle, Document, IconSVG, IconSVGProps
} from "../../../../components"
import { XStack, YStack } from "tamagui"
import { translate } from "../../../../i18n"

export type CourseInformationProps = {
  name?: string
  price?: string
  category?: string
  duration?: number
  promotionPrice?: string
  rateNumber?: string
  reviewNumber?: string
  studentNumber?: string
  certificate?: boolean
}

const convert = (n: number) => `${n / 60 ^ 0}`.slice(-2) + ',' + ('0' + n % 60).slice(-1)

export const CourseInformation = (props: CourseInformationProps) => {
  const {
    name = "Intro to UI/UX Design",
    price = "70",
    category = "UI/UX Design",
    duration = 0,
    promotionPrice = "40",
    rateNumber = "4,8",
    reviewNumber = "4,479",
    studentNumber = "9,839",
    certificate = true,
    // reviewNumber = "N/A",
    // studentNumber = "N/A",
    // ...rest
  } = props
  // const {
  //   name = "",
  //   price = "",
  //   duration = "",
  //   promotionPrice = "",
  //   reviewNumber = "",
  //   studentNumber = "",
  //   certificate = "",
  //   ...rest
  // } = props

  return (
    <YStack w="$full">
      <Heading text={name} preset="h3"
        marginVertical="$4"
        marginHorizontal="$6"
        numberOfLines={2}
      />
      <XStack marginHorizontal="$6" space="$4">
        <Tag text={category} />

        <XStack space="$2">
          <IconSVG color="#FB9400" size="$4" as={<Star set="bulk" />} />
          <Body size="large" numberOfLines={1}>
            {`${rateNumber} (${reviewNumber} ${translate("common.reviews").toLowerCase()})`}
          </Body>
          {/* text={`"4.8 (4,479 reviews)"`} /> */}
        </XStack>
      </XStack>

      <YStack h="$2" />

      <XStack marginHorizontal="$6" ai="center" space="$2" >
        {price && (
          <Heading
            preset="h3"
            numberOfLines={1}
            text={`$${price}`}
            color="$primary500" />
        )}

        {promotionPrice && (
          <Heading
            preset="h5"
            textDecorationLine="line-through"
            numberOfLines={1}
            text={`$${promotionPrice}`}
            color="$greyscale500" />
        )}
      </XStack>

      <YStack h="$2" />
      <XStack marginHorizontal="$6" jc="space-between">
        <Group ic={<People set="bold" />}
          txt={`${studentNumber} ${translate("common.students")}`} />

        <Group ic={<TimeCircle set="bold" />}
          txt={`${convert(duration)} ${translate("common.hours")}`} />

        <Group ic={<Document set="bold" />}
          txt={`${translate("common.certificate")}`}
          color={certificate ? "$primary500" : "$greyscale500"} />

      </XStack>
      <YStack h="$2" />
    </YStack>
  )
}

const Group = (
  { ic, txt, color }: { ic?: IconSVGProps["as"], txt?: string, color?: IconSVGProps["color"] }
) => (
  <XStack ai="center" space="$1.5">
    <IconSVG size="$4" color={color ?? "$primary500"} as={ic} />
    <Body size="large" numberOfLines={1} text={txt} />
  </XStack>
)