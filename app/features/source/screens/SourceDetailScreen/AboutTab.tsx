import React, { } from "react"
import { Avatar, Box, Button, Icon, Row } from "native-base"
import { HScrollView } from "react-native-head-tab-view"
import {
  Chat, EduBody, EduHeading,
  EduHeadingProps, IconBrand,
  kUserIMG, ListTile,
} from "../../../../components"
import { translate } from "../../../../i18n"

interface AboutTabProps {
  index: number
}

export function AboutTab(props: AboutTabProps) {
  return (
    <HScrollView showsVerticalScrollIndicator={false} index={props.index}>
      <Box>
        <SHeading tx="common.mentor" />
        <ListTile
          Leading={<Avatar size={"lg"} source={kUserIMG} />}
          title={{ text: "Jonathan Williams" }}
          subtitle={{ text: "Senior UI/UX Designer at Google" }}
          Trailing={<Icon color="primary.500" as={<Chat set="light" />} />}
        />

        <SHeading text={`${translate("common.about")} ${translate("common.course")}`} />
        <EduBody
          marginLeft={6}
          marginRight={6}
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. \n`}
        />
        <EduBody
          marginLeft={6}
          marginRight={6}
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Read more...`}
        />

        <SHeading tx="common.tools" />
        <ToolCard />
      </Box>
    </ HScrollView >
  )
}

function ToolCard(props: any) {
  return (
    <Button
      padding="6"
      paddingTop="0"
      disabled
      // height="20"
      colorScheme="blue"
      variant="ghost"
      borderRadius="none"
    >
      <Row width="full" justifyContent="space-evenly" alignItems="center" >
        <IconBrand icon="figma" />
        <Box px="1" />
        <EduBody
          flex={1}
          type="semibold"
          sizeT="large"
          numberOfLines={1}
          text={`Figma`}
          color={"greyscale.900"}
        />
        <Box px="1" />
      </Row>
    </Button>
  )
}

function SHeading(props: EduHeadingProps) {
  return (<EduHeading
    preset="h5"
    marginTop={4}
    marginBottom={4}
    marginLeft={6}
    marginRight={6}
    numberOfLines={1}
    {...props} />)
}
