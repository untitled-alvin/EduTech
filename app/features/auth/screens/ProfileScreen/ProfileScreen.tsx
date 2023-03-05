import React, { FC, useRef, useState } from "react"
import { ChevronRight, EduDivider, EduBody, EduHeading, Logout, Screen, User, Wallet, AssetsImage, MoreCircle } from "../../../../components"
import { translate } from "../../../../i18n"
import { HomeTabScreenProps } from "../../../../navigators/HomeNavigator"
import { Box, Column, Icon } from "native-base"
import { LogoutDialog } from "./LogoutDialog"
import { ProfileAvatarForm } from "./ProfileAvatarForm"
import { useHeader } from "../../../../utils/useHeader"
import { useStores } from "../../../../models"
import { ListTile } from "./ListTile"
import { observer } from "mobx-react-lite"

export const ProfileScreen: FC<HomeTabScreenProps<"Profile">> = observer(function ProfileScreen(_props) {
  useHeader({
    titleTx: "common.profile",
    LeftActionComponent: (<AssetsImage marginLeft="4" marginRight="4" image="logo" />),
    onLeftPress: () => { },
    RightActionComponent: (
      <Icon marginLeft="4" marginRight="4"
        as={<MoreCircle set="light" />}
        color="greyScale.900" />),
    onRightPress: () => { },
  })

  const { navigation } = _props
  const { authenticationStore } = useStores()
  // const [isOpen, setIsOpen] = useState(true)
  const cancelRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const user = authenticationStore.user
  const email = user?.email ?? ""
  const fullname = user?.fullname ?? ""

  const onAccept = async () => {
    setIsOpen(false)
    await authenticationStore.logout()
  };
  const onReject = () => setIsOpen(false)
  const onPressLogout = () => setIsOpen(true)

  return (
    <Screen safeAreaEdges={["bottom", "left", "right"]} >
      <Column
        // padding="6"
        paddingLeft="6"
        paddingRight="6"
        // backgroundColor="blue.400"
        alignItems="center"
        justifyContent="center"
      >
        <ProfileAvatarForm />

        <Box height="4" />
        <EduHeading preset="h4" numberOfLines={1} text={fullname} />


        <Box height="2" />
        <EduBody fontWeight="semibold" numberOfLines={1} text={email} />
      </Column>

      <Box height="6" />
      <EduDivider marginLeft="6" marginRight="6" />
      <Box height="4" />

      <ListTile
        leftIcon={<User set="curved" />}
        rightIcon={<ChevronRight set="light" size={"small"} />}
        onPress={() => navigation.push("EditProfile")}
        text={`${translate("common.edit")} ${translate("common.profile")}`}
      />
      <ListTile
        leftIcon={<Wallet set="curved" />}
        rightIcon={<ChevronRight set="light" size={"small"} />}
        onPress={() => navigation.push("Payment")}
        text={translate("common.payment")}
      />
      <ListTile
        color="#F75555"
        text={translate("common.logOut")}
        leftIcon={<Logout set="curved" />}
        // onPress={() => setIsOpen(true)}
        onPress={onPressLogout}
      />

      <LogoutDialog
        isOpen={isOpen}
        onReject={onReject}
        onAccept={onAccept}
      />
    </Screen>
  )
})