import React, { } from "react"
import { observer } from "mobx-react-lite"
import { HScrollView } from "react-native-head-tab-view"
import { Button, XStack, YStack } from "tamagui"
import {
  Chat, Body, Heading, HeadingProps, BrandIcon, IconSVG,
} from "../../../../components"
import { translate } from "../../../../i18n"
import { useStores } from "../../../../models"
import { MentorListTile } from "../../../mentor"

interface AboutTabProps { index: number }

export const AboutTab = observer((props: AboutTabProps) => {
  const { courseDetailStore } = useStores()
  const { course, mentor } = courseDetailStore
  const description = course?.description ?? "N/A"

  return (
    <HScrollView showsVerticalScrollIndicator={false} index={props.index}>
      <YStack>
        {/* MENTOR INFO */}
        <SHeading mb="$2" tx="common.mentor" />
        {mentor && <MentorListTile mentor={mentor}
          Trailing={<IconSVG color="$primary500" as={<Chat set="light" />} />}
        />}

        {/* DESCRIPTION INFO */}
        <SHeading text={`${translate("common.about")} ${translate("common.course")}`} />
        <Body marginHorizontal="$6" text={description} />

        {/* TOOL INFO */}
        <SHeading tx="common.tools" />
        <ToolCard />
      </YStack>
    </ HScrollView >
  )
})

const ToolCard = (props: any) => (
  <Button padding="$6" pt="$0" h="$12" disabled>
    <XStack w="$full" jc="space-evenly" ai="center" space="$1" >
      <BrandIcon icon="figma" />
      <Body flex={1} weight="semibold" size="large" numberOfLines={1} text={`Figma`} />
    </XStack>
  </Button>
)

const SHeading = (props: HeadingProps) => (
  <Heading preset="h5" marginVertical="$4" marginHorizontal="$6" numberOfLines={1}
    {...props} />
)
