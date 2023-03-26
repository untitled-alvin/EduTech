import React, { } from "react"
import { HScrollView } from "react-native-head-tab-view"
import {
  AssetsImage,
  Chat, EduBody, EduHeading,
  EduHeadingProps, IconBrand,
  IconSVG,
  ListTile,
} from "../../../../components"
import { translate } from "../../../../i18n"
import { Avatar, Button, XStack, YStack } from "tamagui"

interface AboutTabProps { index: number }

export function AboutTab(props: AboutTabProps) {
  return (
    <HScrollView showsVerticalScrollIndicator={false} index={props.index}>
      <YStack>
        <SHeading tx="common.mentor" />
        <ListTile
          Leading={<Avatar size="$12"><AssetsImage image="user" style={{ flex: 1 }} /></Avatar>}
          // Leading={ <Avatar size="lg" source={kUserIMG} />}
          title={{ text: "Jonathan Williams" }}
          subtitle={{ text: "Senior UI/UX Designer at Google" }}
          Trailing={<IconSVG color="$primary500" size="$4" as={<Chat set="light" />} />}
        />

        <SHeading text={`${translate("common.about")} ${translate("common.course")}`} />
        <EduBody marginHorizontal="$6"
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. \n`}
        />
        <EduBody marginHorizontal="$6"
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Read more...`}
        />

        <SHeading tx="common.tools" />
        <ToolCard />
      </YStack>
    </ HScrollView >
  )
}

function ToolCard(props: any) {
  return (
    <Button padding="$6" pt="$0" h="$12" backgroundColor="white" disabled>
      <XStack w="$full" jc="space-evenly" ai="center" space="$1" >
        <IconBrand icon="figma" />
        <EduBody flex={1} type="semibold" sizeT="large" numberOfLines={1} text={`Figma`} />
      </XStack>
    </Button>
  )
}

function SHeading(props: EduHeadingProps) {
  return <EduHeading preset="h5" marginVertical="$4" marginHorizontal="$6" numberOfLines={1}  {...props} />
}
