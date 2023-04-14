import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { XStack, YStack } from "tamagui"
import {
  Lock,
  Message,
  Screen,
  Hide,
  Show,
  LinkButton,
  Separator,
  Body,
  Button,
  EduShadow,
  Input,
  ErrorMessage,
  Checkbox,
  Heading
} from "../../../components"
import { translate } from "../../../i18n"
import { useStores } from "../../../models"
import { AppStackScreenProps } from "../../../navigators"
import { useLoadingService } from "../../../services/loading"
import { useBackHeader } from "../../../utils/useBackHeader"
import { GoogleButton } from "../components"
import { validationEmail, validationPassword } from "../validator"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> { }

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen(_props) {
  const { navigation } = _props
  const { authenticationStore } = useStores()
  const loadingService = useLoadingService()

  const [errors, setErrors] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isRemember, setIsRemember] = useState(false)

  useBackHeader({})

  useEffect(() => {
    setEmail("andrew_ainsley@yourdomain.com")
    setPassword("1234567")
  }, [])

  const handleLoginGoogle = async () => {
    loadingService.showLoading()
    await authenticationStore.loginGoogle()
    loadingService.hideLoading()
  }

  const validation = () => {
    return {
      email: validationEmail(email),
      password: validationPassword(password),
    }
  }

  async function submit() {
    setAttemptsCount(attemptsCount + 1)

    // Validate and show problems 
    const problems = validation()
    const valid = !Object.values(problems).some((v) => !!v)
    setErrors(valid ? undefined : problems)

    if (!valid) return

    authenticationStore.setAutoLogin(isRemember)

    loadingService.showLoading()
    const response = await authenticationStore.signUp({ email, password })
    loadingService.hideLoading()

    if (response.kind !== "ok") alert(response.kind)
  }

  return (
    <Screen safeAreaEdges={["bottom", "left", "right"]} KeyboardAvoidingViewProps={{ enabled: false }}>
      <YStack h="$full" jc="flex-start" paddingHorizontal="$6">
        <YStack justifyContent="flex-start" space="$3.5">
          <Heading preset="h1" margin="$3.5" ml="$none" tx="letsIn.createYourAccount" />

          <YStack>
            <Input
              error={!!errors?.email}
              value={email}
              onChangeText={setEmail}
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder={translate("common.email")}
              onSubmitEditing={submit}
              LeftIcon={<Message set="bold" />}
            />
            <ErrorMessage text={errors?.email} />
          </YStack>

          <YStack>
            <Input
              error={!!errors?.password}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              onSubmitEditing={submit}
              LeftIcon={<Lock set="bold" />}
              onPressRightIcon={() => setIsPasswordHidden(!isPasswordHidden)}
              RightIcon={isPasswordHidden ? <Show set="bold" /> : <Hide set="bold" />}
              secureTextEntry={isPasswordHidden}
              placeholder={translate("common.password")}
            />
            <ErrorMessage text={errors?.password} />
          </YStack>

          <Checkbox
            label={<Body weight="semibold" tx="letsIn.rememberMe" />}
            checked={isRemember}
            onCheckedChange={(value) => setIsRemember(!isRemember)}
          />

          <EduShadow preset="button_1">
            <Button tx="common.signUp" onPress={submit} />
          </EduShadow>
        </YStack>

        <YStack flex={1}>
          <YStack flex={4} />
          <XStack ai="center" jc="center" marginHorizontal="$3.5" >
            <Separator als="center" flex={1} />
            <Body
              size="xl"
              weight="semibold"
              color="$greyscale700"
              marginHorizontal="$3.5"
              text={translate("letsIn.orContinueWith").toLocaleLowerCase()}
            />
            <Separator als="center" flex={1} />
          </XStack>

          <YStack flex={3} />

          <GoogleButton onPress={handleLoginGoogle} />
          <YStack flex={4} />

          <XStack justifyContent="center" alignItems="center" >
            <Body color="$greyscale500" weight="regular" tx="letsIn.alreadyHaveAnAccount" />
            <LinkButton tx="common.signIn" onPress={() => navigation.push("SignIn")} />
          </XStack>
          <YStack flex={2} />
        </YStack>
      </YStack >
    </Screen >
  )
})



