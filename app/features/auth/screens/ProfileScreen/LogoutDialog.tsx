import React from "react"
import {
  EduButton, EduDialogContent,
  EduDialogOverlay, EduDialogTitle,
  EduDivider, EduHeading
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
        <EduDialogOverlay key="overlay" />

        <EduDialogContent
          key="content"
          w="$full"
          position="absolute"
          margin="$0"
          padding="$0"
          paddingHorizontal="$6"
          bottom={0} >
          <SafeAreaView >

            <YStack h="$6" />

            <EduDialogTitle tx="common.logOut" color={"#F75555"} />

            <EduDivider width="$full" margin="$4" />

            <EduHeading textAlign="center" preset="h5" tx="profileScreen.logoutQuestion" />

            <YStack h="$6" />

            <XStack space="$4">
              <EduButton preset="secondary" tx="common.cancel" flex={1} onPress={onReject} />
              <EduButton tx="profileScreen.logoutConfirm" flex={1} onPress={onAccept} />
            </XStack>

            <YStack h="$3" />
          </SafeAreaView>
        </EduDialogContent>
      </AlertDialog.Portal>
    </AlertDialog >
  )

  // return (
  //   <Modal justifyContent="flex-end"  {...props} >
  //     <SafeAreaView >
  //       <AlertDialog.Content
  //         width={"full"}
  //         margin="0"
  //         justifyItems="center"
  //         alignItems="center"
  //         justifyContent="center"
  //         borderRadius={40}
  //         borderBottomRadius="none"
  //         paddingLeft="4"
  //         paddingRight="4"
  //       >
  //         <Box h="8" />
  //         <EduHeading preset="h4" tx="common.logOut" color={"#F75555"} />
  //         <EduDivider width="$full" margin="$4" marginHorizontal="4" />
  //         <EduHeading textAlign="center" preset="h5" tx="profileScreen.logoutQuestion" />
  //         <Box height="6" />
  //         <Row>
  //           <EduButton preset="secondary" tx="common.cancel" flex={1} onPress={props.onReject} />
  //           <Box width="4" />
  //           <EduButton tx="profileScreen.logoutConfirm" flex={1} onPress={props.onAccept} />
  //         </Row>
  //         <Box h="8" />
  //       </AlertDialog.Content>
  //     </SafeAreaView>
  //   </Modal>
  // )
}
