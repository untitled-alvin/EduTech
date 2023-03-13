import React from "react"
import {
  EduBody,
  EduHeading, People,
  Star, Tag, TimeCircle, Document
} from "../../../../components"
import { Box, Column, Icon, Row } from "native-base"
import { translate } from "../../../../i18n"

interface SourceInformationProps { }

export const SourceInformation = (props: SourceInformationProps) => {
  return (
    <Column width="full">
      <EduHeading
        preset="h3"
        marginTop={4}
        marginBottom={4}
        marginLeft={6}
        marginRight={6}
        numberOfLines={1}
        text="Intro to UI/UX Design"
      />

      <Row marginLeft={6} marginRight={6} >
        <Tag text="UI/UX Design" />
        <Box width={4} />
        <Row>
          <Icon
            alignSelf="center"
            color="#FB9400"
            marginRight={2}
            as={<Star set="bulk" size="small" />}
          />
          <EduBody sizeT="large" numberOfLines={1} text="4.8 (4,479 reviews)" />
        </Row>
      </Row>

      <Box height="2" />
      <Row marginLeft={6} marginRight={6} alignItems="center" >
        <EduHeading
          preset="h3"
          color="primary.500"
          numberOfLines={1}
          text="$40" />

        <Box width="2" />

        <EduHeading preset="h5"
          strikeThrough
          color="greyScale.500"
          numberOfLines={1} text="$75" />
      </Row>

      <Box height="2" />
      <Row marginLeft={6} marginRight={6} justifyContent="space-between" >
        <Row>
          <Icon
            alignSelf="center"
            color="primary.500"
            marginRight={1}
            as={<People set="bold" size="small" />}
          />
          <EduBody sizeT="large" numberOfLines={1}
            text={`9,839 ${translate("common.students")}`} />
        </Row>

        <Row>
          <Icon
            alignSelf="center"
            color="primary.500"
            marginRight={1}
            as={<TimeCircle set="bold" size="small" />}
          />
          <EduBody sizeT="large" numberOfLines={1}
            text={`2,5 ${translate("common.hours")}`} />
        </Row>

        <Row>
          <Icon
            alignSelf="center"
            color="primary.500"
            marginRight={1}
            as={<Document set="bold" size="small" />}
          />
          <EduBody sizeT="large" numberOfLines={1} tx="common.certificate" />
        </Row>
      </Row>
      <Box height="2" />
    </Column>
  )
}
