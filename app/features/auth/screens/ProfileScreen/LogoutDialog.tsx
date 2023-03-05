import { AlertDialog, Box, IModalProps, Row } from "native-base"
import React from "react"
import { EduButton, EduDivider, EduHeading } from "../../../../components"
import { SafeAreaView } from "react-native"
import { Modal } from "native-base"

export interface LogoutDialogProps extends IModalProps {
  onAccept?: () => void,
  onReject?: () => void,
}

export function LogoutDialog(props: LogoutDialogProps) {
  return (
    <Modal justifyContent="flex-end"  {...props} >
      <SafeAreaView >
        <AlertDialog.Content
          width={"full"}
          margin="0"
          justifyItems="center"
          alignItems="center"
          justifyContent="center"
          borderRadius={40}
          borderBottomRadius="none"
          paddingLeft="4"
          paddingRight="4"
        >
          <Box h="8" />
          <EduHeading preset="h4" tx="common.logOut" color={"#F75555"} />
          <EduDivider width="full" margin="4" marginLeft="4" marginRight="4" />
          <EduHeading textAlign="center" preset="h5" tx="profileScreen.logoutQuestion" />
          <Box height="6" />
          <Row>
            <EduButton preset="secondary" tx="common.cancel" flex={1} onPress={props.onReject} />
            <Box width="4" />
            <EduButton tx="profileScreen.logoutConfirm" flex={1} onPress={props.onAccept} />
          </Row>
          <Box h="8" />
        </AlertDialog.Content>
      </SafeAreaView>
    </Modal>
  )
}
