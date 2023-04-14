import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { XStack, YStack } from "tamagui";
import {
  BrandIcon,
  Screen,
  LinkButton,
  AssetsImage,
  Separator,
  Body,
  Button,
  EduShadow,
  Heading,
} from "../../../components"
import { translate } from "../../../i18n"
import { useStores } from "../../../models"
import { AppStackScreenProps } from "../../../navigators"
import { useLoadingService } from "../../../services/loading"

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
          <Heading preset="h1" textAlign="center" tx="letsIn.letSYouIn" />
          <YStack flex={2} />
        </YStack>

        <YStack flex={4}>
          <Button
            preset="social"
            rounded={false}
            icon={<BrandIcon icon="google" />}
            onPress={loginGoogle}
          >
            <Body ml="$2" weight="semibold" tx="letsIn.continueWithGoogle" />
          </Button>

          <YStack flex={1} />

          <XStack marginHorizontal="$4" ai="center" jc="center">
            <Separator als="center" flex={1} />
            <Body
              size="xl"
              weight="semibold"
              text={translate("common.or").toLocaleLowerCase()}
              color="$greyscale700"
              marginHorizontal="$4"
            />
            <Separator als="center" flex={1} />
          </XStack>

          <YStack flex={1} />

          <EduShadow preset="button_1">
            <Button tx="letsIn.signInWithPassword" onPress={() => navigation.push("SignIn")} />
          </EduShadow>

          <YStack flex={2} />

          <XStack jc="center" ai="center">
            <Body color="$greyscale500" weight="regular"
              text={`${translate("letsIn.donTHaveAnAccount")} `} />
            <LinkButton tx="common.signUp" onPress={() => navigation.push("SignUp")} />
          </XStack>
          <YStack flex={2} />
        </YStack>
      </YStack >
    </Screen >
  )
})



