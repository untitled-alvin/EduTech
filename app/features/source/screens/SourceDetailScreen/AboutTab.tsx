import React, { useMemo } from "react"
import { Chat, EduBody, EduHeading, EduHeadingProps, IconBrand, kUserIMG, ListTile, } from "../../../../components"
import { Avatar, Box, Button, IBoxProps, Icon, Row } from "native-base"
import { translate } from "../../../../i18n"
import { ScrollView } from "react-native-collapsible-tab-view"

interface AboutTabProps extends IBoxProps { }

export function AboutTab(props: AboutTabProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}
      accessibilityTraits={undefined}
      accessibilityComponentType={undefined}>
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
    </ ScrollView >
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
          color={"greyScale.900"}
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
