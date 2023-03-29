import React from "react"
import { Chat, EduBody, EduDivider, EduHeading, Discovery, Chip, IconSVG } from "../../../../components"
import { UserAvatar } from "../../../auth/components/UserAvatar"
import { translate } from "../../../../i18n"
import { openLinkInBrowser } from "../../../../utils/openLinkInBrowser"
import { XStack, YStack, YStackProps } from "tamagui"

interface InfoColumnProps { title?: string, subtitle?: string }

const InfoColumn = (props: InfoColumnProps) => {
  return (
    <YStack flex={1} ai="center">
      <EduHeading preset="h4" numberOfLines={1} text={props.title} />
      <YStack height="$2" />
      <EduBody numberOfLines={1} text={props.subtitle} />
    </YStack>
  )
}

type MentorInformationProps = YStackProps & {}

export const MentorInformation = (props: MentorInformationProps) => {
  return (
    <YStack ai="center" {...props} >
      <UserAvatar size="$30" />
      <EduHeading mt="$2" mb="$1" preset="h4" marginHorizontal="$6" numberOfLines={1}
        text="Jonathan Williams"
      />

      <EduBody marginHorizontal="$6" numberOfLines={1} type="semibold"
        text="Senior UI/UX Designer at Google" />

      <YStack h="$4" />

      <XStack marginHorizontal="$6" jc="space-between" >
        <InfoColumn title="25" subtitle={translate("common.courses")} />
        <EduDivider vertical />
        <InfoColumn title="22,379" subtitle={translate("common.students")} />
        <EduDivider vertical />
        <InfoColumn title="9,287" subtitle={translate("common.reviews")} />
      </XStack>

      <YStack h="$4" />

      <XStack marginHorizontal="$6" jc="space-between" space="$4" >
        <Chip
          flex={1}
          sizeT="large"
          onPress={() => { }}
          tx="common.message"
          leftIcon={<Chat set="bold" />}
        />
        <Chip
          flex={1}
          sizeT="large"
          type="outline"
          tx="common.website"
          onPress={() => openLinkInBrowser('google.com.vn')}
          leftIcon={<Discovery set="bold" />}
        />
      </XStack>
      <YStack h="$6" />

      <EduDivider marginHorizontal="$6" />
      <YStack h="$6" />
    </YStack>
  )
}

