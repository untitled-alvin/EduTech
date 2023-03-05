import { AlertDialog, Box } from "native-base"
import React from "react"
import { IAlertDialogProps } from "native-base/lib/typescript/components/composites"
import { AssetsImage } from "../../AssetsImage/AssetsImage"
import { EduHeading } from "../Typography/EduHeading"
import { EduBody } from "../Typography/EduBody"

export interface SuccessDialogProps extends IAlertDialogProps {
}

export function SuccessDialog(props: SuccessDialogProps) {
  return (
    <AlertDialog leastDestructiveRef={undefined}  {...props}>
      <AlertDialog.Content
        justifyItems="center"
        alignItems="center"
        justifyContent="center"
        borderRadius="2xl"
        paddingLeft="4"
        paddingRight="4"
      >
        <Box h="8" />
        <AssetsImage image="profileSuccess" />
        <Box height="6" />
        <EduHeading color="primary.500" preset="h4" tx="common.congratulations" />
        <Box height="4" />
        <EduBody
          textAlign="center"
          type="regular"
          sizeT="large"
          text={`${("Your account is ready to use. You will be redirected to the Home page in a few seconds.")}`}
        />
        <Box height="6" />
        <AssetsImage image="indicator" />
        <Box h="8" />
      </AlertDialog.Content>
    </AlertDialog>
  )
}
