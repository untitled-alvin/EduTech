import { observer } from "mobx-react-lite"
import React from "react"
import { XStack, YStack } from "tamagui";
import { EduBody, EduHeading } from "../../../components";
import { useStores } from "../../../models";
import { UserAvatar } from "./UserAvatar";

export const WelcomeUserHeader = observer(function WelcomeUserHeader(_props) {
  const { authenticationStore } = useStores()

  return (
    <XStack paddingVertical="$4" paddingHorizontal="$6" ai="center">
      <UserAvatar size="$12" />
      <YStack w="$4" />
      <YStack>
        <EduBody weight="regular" size="large" tx="homeScreen.header" />
        <EduHeading preset="h5" text={authenticationStore?.user?.fullname ?? "User"} />
      </YStack>
    </XStack>
  )
})