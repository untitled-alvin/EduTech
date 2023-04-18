import React, { FC, useState } from "react"
import { YStack } from "tamagui"
import {
  ChevronRight, Separator, Body, Heading,
  Logout, Screen, User, Wallet, AssetsImage
} from "../../../../components"
import { translate } from "../../../../i18n"
import { HomeTabScreenProps } from "../../../../navigators/HomeNavigator"
import { LogoutDialog } from "./LogoutDialog"
import { ProfileAvatarForm } from "./ProfileAvatarForm"
import { useHeader, MoreButton } from "../../../../utils/useHeader"
import { useStores } from "../../../../models"
import { SettingItem } from "./SettingItem"
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
    RightActionComponent: <MoreButton />,
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
        <Heading preset="h4" numberOfLines={1} text={fullname} />

        <YStack h="$2" />
        <Body fontWeight="semibold" numberOfLines={1} text={email} />
      </YStack>

      <YStack h="$6" />
      <Separator marginHorizontal="$6" />
      <YStack h="$4" />

      <SettingItem
        leftIcon={<User set="curved" />}
        rightIcon={<ChevronRight set="light" />}
        onPress={() => navigation.push("EditProfile")}
        text={`${translate("common.edit")} ${translate("common.profile")}`}
      />
      <SettingItem
        leftIcon={<Wallet set="curved" />}
        rightIcon={<ChevronRight set="light" />}
        onPress={() => navigation.push("Payment")}
        text={translate("common.payment")}
      />
      <SettingItem
        color="$statusError"
        text={translate("common.logOut")}
        leftIcon={<Logout set="curved" />}
        onPress={onPressLogout}
      />

      <LogoutDialog open={isOpen} onReject={onReject} onAccept={onAccept} />
    </Screen>
  )
})