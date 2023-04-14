import React from "react"
import { Chat, Body, Separator, Heading, Discovery, Chip } from "../../../../components"
import { UserAvatar } from "../../../auth/components/UserAvatar"
import { translate } from "../../../../i18n"
import { openLinkInBrowser } from "../../../../utils/openLinkInBrowser"
import { XStack, YStack, YStackProps } from "tamagui"

interface InfoColumnProps { title?: string, subtitle?: string }

const InfoColumn = (props: InfoColumnProps) => {
  return (
    <YStack flex={1} ai="center">
      <Heading preset="h4" numberOfLines={1} text={props.title} />
      <YStack height="$2" />
      <Body numberOfLines={1} text={props.subtitle} />
    </YStack>
  )
}

type MentorInformationProps = YStackProps & {}

export const MentorInformation = (props: MentorInformationProps) => {
  return (
    <YStack ai="center" {...props}>
      <UserAvatar size="$30" />
      <Heading mt="$2" mb="$1" preset="h4" marginHorizontal="$6" numberOfLines={1}
        text="Jonathan Williams"
      />

      <Body marginHorizontal="$6" numberOfLines={1} weight="semibold"
        text="Senior UI/UX Designer at Google" />

      <YStack h="$4" />

      <XStack marginHorizontal="$6" jc="space-between" >
        <InfoColumn title="25" subtitle={translate("common.courses")} />
        <Separator vertical />
        <InfoColumn title="22,379" subtitle={translate("common.students")} />
        <Separator vertical />
        <InfoColumn title="9,287" subtitle={translate("common.reviews")} />
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

