import React, { FC, useState } from "react"
import { YStack } from "tamagui"
import {
  ChevronRight, EduDivider, EduBody, EduHeading,
  Logout, Screen, User, Wallet, AssetsImage
} from "../../../../components"
import { translate } from "../../../../i18n"
import { HomeTabScreenProps } from "../../../../navigators/HomeNavigator"
import { LogoutDialog } from "./LogoutDialog"
import { ProfileAvatarForm } from "./ProfileAvatarForm"
import { useHeader, MoreCircleIcon } from "../../../../utils/useHeader"
import { useStores } from "../../../../models"
import { ListTile } from "./ListTile"
import { observer } from "mobx-react-lite"

export const ProfileScreen: FC<HomeTabScreenProps<"Profile">> = observer((props) => {
  const { navigation } = props
  const { authenticationStore } = useStores()
  const [isOpen, setIsOpen] = useState(false)

  const user = authenticationStore.user
  const email = user?.email ?? ""
  const fullname = user?.fullname ?? ""

  useHeader({
    titleTx: "common.profile",
    LeftActionComponent: <AssetsImage image="logo" />,
    RightActionComponent: <MoreCircleIcon />,
  })

  const onAccept = async () => {
    setIsOpen(false)
    await authenticationStore.logout()
  }

  const onReject = () => setIsOpen(false)

  const onPressLogout = () => setIsOpen(true)

  return (
    <Screen safeAreaEdges={["bottom", "left", "right"]} >
      <YStack ai="center" jc="center" paddingHorizontal="$6">
        <ProfileAvatarForm />

        <YStack h="$4" />
        <EduHeading preset="h4" numberOfLines={1} text={fullname} />

        <YStack h="$2" />
        <EduBody fontWeight="semibold" numberOfLines={1} text={email} />
      </YStack>

      <YStack h="$6" />
      <EduDivider marginHorizontal="$6" />
      <YStack h="$4" />

      <ListTile
        leftIcon={<User set="curved" />}
        rightIcon={<ChevronRight set="light" />}
        onPress={() => navigation.push("EditProfile")}
        text={`${translate("common.edit")} ${translate("common.profile")}`}
      />
      <ListTile
        leftIcon={<Wallet set="curved" />}
        rightIcon={<ChevronRight set="light" />}
        onPress={() => navigation.push("Payment")}
        text={translate("common.payment")}
      />
      <ListTile
        color="#F75555"
        text={translate("common.logOut")}
        leftIcon={<Logout set="curved" />}
        onPress={onPressLogout}
      />

      <LogoutDialog open={isOpen} onReject={onReject} onAccept={onAccept} />
    </Screen>
  )
})