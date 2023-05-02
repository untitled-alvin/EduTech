import React, { useMemo } from "react"
import { Avatar, XStack, YStack, YStackProps } from "tamagui"
import {
  Chat,
  Body,
  Separator,
  Heading,
  Discovery,
  Chip,
  mentorImages
} from "../../../../components"
import { translate } from "../../../../i18n"
import { openLinkInBrowser } from "../../../../utils/openLinkInBrowser"

type MentorInformationProps = YStackProps & {
  name?: string
  occupation?: string
}

export const MentorInformation = (props: MentorInformationProps) => {
  const {
    name = "",
    occupation = "",
    ...rest
  } = props

  const imageUri = useMemo(() => {
    return mentorImages[Math.floor(Math.random() * mentorImages.length)]
  }, [])

  return (
    <YStack ai="center" {...rest}>
      <Avatar size="$30"><Avatar.Image src={imageUri} /></Avatar>

      <Heading
        mt="$2" mb="$1" preset="h4"
        text={name}
        marginHorizontal="$6"
        numberOfLines={1} />

      <Body weight="semibold" text={occupation} marginHorizontal="$6" numberOfLines={1} />

      <YStack h="$4" />

      <XStack marginHorizontal="$6" jc="space-between" >
        <SubIF title="25" subtitle={translate("common.courses")} />
        <Separator vertical />
        <SubIF title="22,379" subtitle={translate("common.students")} />
        <Separator vertical />
        <SubIF title="9,287" subtitle={translate("common.reviews")} />
      </XStack>

      <YStack h="$4" />

      <XStack marginHorizontal="$6" jc="space-between" space="$4" >
        <Chip
          flex={1}
          size="large"
          onPress={() => { }}
          tx="common.message"
          leftIcon={<Chat set="bold" />}
        />
        <Chip
          flex={1}
          size="large"
          preset="outline"
          tx="common.website"
          onPress={() => openLinkInBrowser('google.com.vn')}
          leftIcon={<Discovery set="bold" />}
        />
      </XStack>
      <YStack flex={1} />
      <Separator marginHorizontal="$6" />
    </YStack>
  )
}

const SubIF = ({ title, subtitle }: { title?: string, subtitle?: string }) => (
  <YStack flex={1} ai="center">
    <Heading preset="h4" numberOfLines={1} text={title} />
    <YStack height="$2" />
    <Body numberOfLines={1} text={subtitle} />
  </YStack>
)
