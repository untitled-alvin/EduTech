import { AlertDialog, Center } from "native-base"
import React from "react"
import { ActivityIndicator } from "react-native"
import { IAlertDialogProps } from "native-base/lib/typescript/components/composites"

export interface LoadingDialogProps extends IAlertDialogProps {
}

export function LoadingDialog(props: LoadingDialogProps) {
  return (
    <AlertDialog
      // padding={0}
      // margin={0}
      // backgroundColor='black'
      // opacity={0.7}
      // leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}
      leastDestructiveRef={undefined}
      {...props}
    >
      <Center>
        <ActivityIndicator />
        {/* <AssetsImage image="indicator" /> */}
      </Center>
      {/* <AlertDialog.Content
        justifyItems='center'
        alignItems='center'
        justifyContent='center'
        borderRadius='2xl'
        paddingLeft="4"
        paddingRight="4"
      >
 
      </AlertDialog.Content> */}
    </AlertDialog>
  )
}
