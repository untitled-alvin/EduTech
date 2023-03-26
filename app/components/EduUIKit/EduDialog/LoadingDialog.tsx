import React from "react"
import { ActivityIndicator } from "react-native"
import { AlertDialogProps, AlertDialog, YStack } from "tamagui"
import { EduDialogOverlay } from "./EduDialogOverlay"

export function LoadingDialog(props: AlertDialogProps) {
  return (
    <AlertDialog {...props}>
      <AlertDialog.Portal>
        <EduDialogOverlay key="overlay" />
        <YStack ai="center">
          <ActivityIndicator />
        </YStack>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}
