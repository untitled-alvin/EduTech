import React from "react"
import {
  EduAlertDialogContent,
  EduAlertDialogOverlay,
  EduAlertDialogTitle,
  Button,
  Separator, Heading
} from "../../../../components"
import { SafeAreaView } from "react-native"
import { AlertDialog, AlertDialogProps, XStack, YStack } from "tamagui"

type LogoutDialogProps = AlertDialogProps & {
  onAccept?: () => void,
  onReject?: () => void
}

export function LogoutDialog(props: LogoutDialogProps) {
  const { onAccept, onReject, ...rest } = props

  return (
    <AlertDialog {...rest}>
      <AlertDialog.Portal>
        <EduAlertDialogOverlay key="overlay" />

        <EduAlertDialogContent
          key="content"
          w="$full"
          position="absolute"
          margin="$0"
          padding="$0"
          paddingHorizontal="$6"
          borderBottomEndRadius={0}
          borderBottomStartRadius={0}
          bottom={0} >
          <SafeAreaView >

            <YStack h="$6" />

            <EduAlertDialogTitle tx="common.logOut" color="#F75555" />

            <Separator margin="$4" />

            <Heading textAlign="center" preset="h5" tx="profileScreen.logoutQuestion" />

            <YStack h="$6" />

            <XStack space="$4">
              <Button preset="secondary" tx="common.cancel" flex={1} onPress={onReject} />
              <Button tx="profileScreen.logoutConfirm" flex={1} onPress={onAccept} />
            </XStack>

            <YStack h="$3" />
          </SafeAreaView>
        </EduAlertDialogContent>
      </AlertDialog.Portal>
    </AlertDialog >
  )
}
