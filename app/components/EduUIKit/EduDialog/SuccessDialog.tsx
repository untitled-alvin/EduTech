import React from "react"
import { AssetsImage } from "../../AssetsImage/AssetsImage"
import { AlertDialog, AlertDialogProps, YStack } from "tamagui"
import { EduDialogOverlay } from "./EduDialogOverlay"
import { EduDialogContent } from "./EduDialogContent"
import { EduDialogDescription } from "./EduDialogDescription"
import { EduDialogTitle } from "./EduDialogTitle"
import { translate } from "../../../i18n"

export function SuccessDialog(props: AlertDialogProps) {
  return (
    <AlertDialog {...props}>
      <AlertDialog.Portal>
        <EduDialogOverlay key="overlay" />
        <EduDialogContent key="content" borderRadius="$16" >
          <YStack ai="center">
            <YStack h="$6" />

            <YStack alignItems="center">
              <AssetsImage image="profileSuccess" />
            </YStack>

            <YStack h="$6" />
            <EduDialogTitle text={`${translate("common.congratulations")}!`} />
            <YStack h="$4" />

            <EduDialogDescription
              text={
                `${("Your account is ready to use. You will be redirected to the Home page in a few seconds.")}`
              }
            />

            <YStack h="$8" />
            <AssetsImage image="indicator" />
            <YStack h="$8" />

          </YStack>
        </EduDialogContent>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}
