import { AlertDialog, Center } from "native-base"
import React from "react"
import { ActivityIndicator } from "react-native"
import { IAlertDialogProps } from "native-base/lib/typescript/components/composites"

export interface LoadingDialogProps extends IAlertDialogProps {
}

export function LoadingDialog(props: LoadingDialogProps) {
  return (
    <AlertDialog leastDestructiveRef={undefined} {...props}>
      <Center>
        <ActivityIndicator />
        {/* <AssetsImage image="indicator" /> */}
      </Center>
    </AlertDialog>
  )
}
