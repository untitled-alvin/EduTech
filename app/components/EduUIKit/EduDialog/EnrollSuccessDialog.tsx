import { AlertDialog, Box } from "native-base"
import React from "react"
import { translate } from "../../../i18n"
import { IAlertDialogProps } from "native-base/lib/typescript/components/composites"
import { AssetsImage } from "../../AssetsImage/AssetsImage"
import { EduHeading } from "../Typography/EduHeading"
import { EduBody } from "../Typography/EduBody"
import { EduButton } from "../Button/EduButton"


export interface EnrollSuccessDialogProps extends IAlertDialogProps {
  onViewSource?: () => void,
  onViewEReceipt?: () => void,
}

export function EnrollSuccessDialog(props: EnrollSuccessDialogProps) {
  return (
    <AlertDialog leastDestructiveRef={undefined}  {...props} >
      <AlertDialog.Content
        width={"80%"}
        margin={0}
        justifyItems="center"
        alignItems="center"
        justifyContent="center"
        borderRadius="2xl"
        paddingLeft="4"
        paddingRight="4"
      // marginLeft="4"
      // marginRight="4"
      >
        <Box h="8" />
        <AssetsImage image="enrollSuccess" />
        <Box height="6" />
        <EduHeading textAlign="center" color="primary.500" preset="h4"
          text={`${translate("source.enrollCourse")} ${translate("common.successful")}!`}
        />
        <Box height="4" />
        <EduBody textAlign="center" type="regular" sizeT="large" tx="source.enrollSuccess" />
        <Box height="6" />
        <EduButton width="full"
          text={`${translate("common.view")} ${translate("common.course")}`}
          onPress={props.onViewSource}
        />
        <Box height="6" />
        <EduButton
          preset="secondary"
          width="full"
          text={`${translate("common.view")} ${translate("common.eReceipt")}`}
          onPress={props.onViewEReceipt}
        />
        <Box h="8" />
      </AlertDialog.Content>
    </AlertDialog>
  )
}
