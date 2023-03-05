import React, { useMemo } from "react"
import {
  Chat, EduBody, EduDivider,
  EduHeading, Discovery, Chip
} from "../../../../components"
import { Box, Column, Icon, Row } from "native-base"
import { UserAvatar } from "../../../auth/components/UserAvatar"
import { translate } from "../../../../i18n"
import { openLinkInBrowser } from "../../../../utils/openLinkInBrowser"

interface InfoColumnProps {
  title?: string,
  subtitle?: string,
}

const InfoColumn = (props: InfoColumnProps) => {
  return (
    <Column flex={1} alignItems="center" >
      <EduHeading preset="h4" numberOfLines={1} text={props.title} />
      <Box height="2" />
      <EduBody numberOfLines={1} text={props.subtitle} />
    </Column>
  )
}

interface MentorInformationProps { }

export const MentorInformation = (props: MentorInformationProps) => {
  return (
    <Column bgColor="white" alignItems="center" >
      <UserAvatar size="xl" />
      <EduHeading
        preset="h4"
        marginTop={2}
        marginBottom={1}
        marginLeft={6}
        marginRight={6}
        numberOfLines={1}
        text="Jonathan Williams"
      />

      <Row marginLeft={6} marginRight={6} >
        <EduBody numberOfLines={1} type="semibold"
          text="Senior UI/UX Designer at Google" />
      </Row>

      <Box height={4} />
      <Row marginLeft={6} marginRight={6} justifyContent="space-between" >
        <InfoColumn title="25" subtitle={translate("common.courses")} />
        <EduDivider vertical />
        <InfoColumn title="22,379" subtitle={translate("common.students")} />
        <EduDivider vertical />
        <InfoColumn title="9,287" subtitle={translate("common.reviews")} />
      </Row>
      <Box height={4} />
      <Row marginLeft={6} marginRight={6} justifyContent="space-between" >
        <Chip
          flex={1}
          sizeT="large"
          onPress={() => { }}
          tx="common.message"
          leftIcon={<Icon as={<Chat set="bold" size="small" />} />}
        />
        <Box width={4} />
        <Chip
          flex={1}
          sizeT="large"
          type="outline"
          tx="common.website"
          onPress={() => openLinkInBrowser('google.com.vn')}
          leftIcon={<Icon as={<Discovery set="bold" size="small" />} />}
        />
      </Row>
      <Box height={6} />
      <EduDivider marginRight="6" marginLeft="6" />
      <Box height={6} />
    </Column>
  )
}

