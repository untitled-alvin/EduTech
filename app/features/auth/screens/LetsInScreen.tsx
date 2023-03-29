import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { XStack, YStack } from "tamagui";
import {
  IconBrand,
  Screen,
  LinkButton,
  AssetsImage,
  EduDivider,
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
            preset="secondary"
            backgroundColor="white"
            borderColor="$greyscale200"
            rounded={false}
            icon={<IconBrand icon="google" />}
            onPress={loginGoogle}>
            <EduBody ml="$2" type="semibold" color="$background" tx="letsIn.continueWithGoogle" />
          </EduButton>

          <YStack flex={1} />

          <XStack marginHorizontal="$4" ai="center" jc="center">
            <EduDivider flex={1} />
            <EduBody
              sizeT="xl"
              fontWeight="semibold"
              text={translate("common.or").toLocaleLowerCase()}
              color="$greyscale700"
              marginHorizontal="$4"
            />
            <EduDivider flex={1} />
          </XStack>

          <YStack flex={1} />

          <EduShadow preset="button_1">
            <EduButton tx="letsIn.signInWithPassword" onPress={() => navigation.push("SignIn")} />
          </EduShadow>

          <YStack flex={2} />

          <XStack jc="center" ai="center">
            <EduBody color="$greyscale500" type="regular"
              text={`${translate("letsIn.donTHaveAnAccount")} `} />
            <LinkButton tx="common.signUp" onPress={() => navigation.push("SignUp")} />
          </XStack>
          <YStack flex={2} />
        </YStack>
      </YStack >
    </Screen >
  )
})



