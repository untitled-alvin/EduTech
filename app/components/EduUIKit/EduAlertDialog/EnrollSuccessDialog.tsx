import React from "react"
import { AlertDialog, AlertDialogProps, YStack } from 'tamagui'
import { translate } from "../../../i18n"
import { AssetsImage } from "../../AssetsImage/AssetsImage"
import { EduButton } from "../Button/EduButton"
import {
  EduAlertDialogContent,
  EduAlertDialogDescription,
  EduAlertDialogOverlay,
  EduAlertDialogTitle
} from "./EduAlertDialog"

type EnrollSuccessDialogProps = AlertDialogProps & {
  onViewSource?: () => void,
  onViewEReceipt?: () => void
}

export function EnrollSuccessDialog(props: EnrollSuccessDialogProps) {
  const { onViewSource, onViewEReceipt, ...rest } = props

  return (
    <AlertDialog {...rest}>
      <AlertDialog.Portal>
        <EduAlertDialogOverlay key="overlay" />
        <EduAlertDialogContent key="content" >
          <YStack>
            <YStack h="$6" />

            <YStack alignItems="center">
              <AssetsImage image="enrollSuccess" />
            </YStack>

            <YStack h="$6" />
            <EduAlertDialogTitle
              text={`${translate("source.enrollCourse")} ${translate("common.successful")}!`}
            />
            <YStack h="$4" />

            <EduAlertDialogDescription tx="source.enrollSuccess" />
            <YStack h="$8" />

            {/* <AlertDialog.Action></AlertDialog.Action> */}
            <EduButton
              onPress={onViewSource}
              text={`${translate("common.view")} ${translate("common.course")}`}
            />

            <YStack h="$3" />

            {/* <AlertDialog.Cancel></AlertDialog.Cancel> */}
            <EduButton
              preset="secondary"
              text={`${translate("common.view")} ${translate("common.eReceipt")}`}
              onPress={onViewEReceipt}
            />
          </YStack>
        </EduAlertDialogContent>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}