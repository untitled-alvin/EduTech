import React from "react"
import { AlertDialog, AlertDialogProps, YStack } from 'tamagui'
import { translate } from "../../../i18n"
import { AssetsImage } from "../../AssetsImage/AssetsImage"
import { EduButton } from "../Button/EduButton"
import { EduDialogTitle } from "./EduDialogTitle"
import { EduDialogDescription } from "./EduDialogDescription"
import { EduDialogOverlay } from "./EduDialogOverlay"
import { EduDialogContent } from "./EduDialogContent"

type EnrollSuccessDialogProps = AlertDialogProps & {
  onViewSource?: () => void,
  onViewEReceipt?: () => void
}

export function EnrollSuccessDialog(props: EnrollSuccessDialogProps) {
  const { onViewSource, onViewEReceipt, ...rest } = props

  return (
    <AlertDialog {...rest}>
      <AlertDialog.Portal>
        <EduDialogOverlay key="overlay" />
        <EduDialogContent key="content" >
          <YStack>
            <YStack h="$6" />

            <YStack alignItems="center">
              <AssetsImage image="enrollSuccess" />
            </YStack>

            <YStack h="$6" />
            <EduDialogTitle
              text={`${translate("source.enrollCourse")} ${translate("common.successful")}!`}
            />
            <YStack h="$4" />

            <EduDialogDescription tx="source.enrollSuccess" />
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
        </EduDialogContent>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}