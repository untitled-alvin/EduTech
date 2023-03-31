import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { XStack, YStack } from "tamagui";
import {
  IconBrand,
  Screen,
  LinkButton,
  AssetsImage,
  EduSeparator,
  EduBody,
  EduButton,
  EduShadow,
} from "../../../components"
import { translate } from "../../../i18n"
import { useStores } from "../../../models"
import { AppStackScreenProps } from "../../../navigators"
import { useLoadingService } from "../../../services/loading";
import { LestInHeading } from "../components";

interface LetsInScreenProps extends AppStackScreenProps<"LetsIn"> { }

export const LetsInScreen: FC<LetsInScreenProps> = observer(function LetsInScreen(_props) {
  const { navigation } = _props
  const { authenticationStore } = useStores()
  const loadingService = useLoadingService()

  async function loginGoogle() {
    loadingService.showLoading()
    await authenticationStore.loginGoogle();
    loadingService.hideLoading()
  }

  return (
    <Screen safeAreaEdges={["bottom", "left", "right", "top"]}>
      <YStack marginHorizontal="$6" h="$full">
        <YStack flex={5} jc="center" >
          <YStack flex={12} ai="center" ac="center">
            <AssetsImage image="letsIn" style={{ flex: 1 }} />
          </YStack>
          <LestInHeading textAlign="center" tx="letsIn.letSYouIn" />
          <YStack flex={2} />
        </YStack>

        <YStack flex={4}>
          <EduButton
            preset="social"
            rounded={false}
            icon={<IconBrand icon="google" />}
            onPress={loginGoogle}
          >
            <EduBody ml="$2" weight="semibold" tx="letsIn.continueWithGoogle" />
          </EduButton>

          <YStack flex={1} />

          <XStack marginHorizontal="$4" ai="center" jc="center">
            <EduSeparator als="center" flex={1} />
            <EduBody
              size="xl"
              weight="semibold"
              text={translate("common.or").toLocaleLowerCase()}
              color="$greyscale700"
              marginHorizontal="$4"
            />
            <EduSeparator als="center" flex={1} />
          </XStack>

          <YStack flex={1} />

          <EduShadow preset="button_1">
            <EduButton tx="letsIn.signInWithPassword" onPress={() => navigation.push("SignIn")} />
          </EduShadow>

          <YStack flex={2} />

          <XStack jc="center" ai="center">
            <EduBody color="$greyscale500" weight="regular"
              text={`${translate("letsIn.donTHaveAnAccount")} `} />
            <LinkButton tx="common.signUp" onPress={() => navigation.push("SignUp")} />
          </XStack>
          <YStack flex={2} />
        </YStack>
      </YStack >
    </Screen >
  )
})



