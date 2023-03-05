import { observer } from "mobx-react-lite"
import { Box, Button, Column, Row, FormControl, Checkbox, Flex } from "native-base"
import React, { FC, useEffect, useState } from "react"
import {
  Lock, IconBrand, Message, Screen, Hide, Show,
  LinkButton, EduDivider, EduInput, EduBody, EduButton
} from "../../../components"
import { translate } from "../../../i18n"
import { useStores } from "../../../models"
import { AppStackScreenProps } from "../../../navigators"
import { useLoadingService } from "../../../services/loading"
import { useHeader } from "../../../utils/useHeader"
import { LestInHeading } from "../components"
import { validationEmail, validationPassword } from "../validator"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> { }

export const SignUpScreen: FC<SignUpScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const { authenticationStore } = useStores()
  const loadingService = useLoadingService()

  const [errors, setErrors] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isRemember, setIsRemember] = useState(false)

  useHeader({
    leftIcon: 'arrowLeft',
    onLeftPress: () => navigation.goBack(),
  })

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
    <Screen safeAreaEdges={["bottom", "left", "right"]}
      KeyboardAvoidingViewProps={{ enabled: false }}>

      <Column
        height={"full"}
        justifyContent="flex-start"
        marginLeft={6}
        marginRight={6}>

        <Column justifyContent="flex-start"  >
          <LestInHeading
            marginTop='4'
            marginBottom='4'
            marginRight='4'
            tx="letsIn.createYourAccount"
          />

          <FormControl isInvalid={!!errors?.email} >
            <EduInput
              value={email}
              onChangeText={setEmail}
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder={translate("common.email")}
              onSubmitEditing={submit}
              InputLeftElement={<Message set="bold" size="small" />}
            />
            <FormControl.ErrorMessage>{errors?.email}</FormControl.ErrorMessage>
          </FormControl>

          <Box height='4' />

          <FormControl isInvalid={!!errors?.password} >
            <EduInput
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              onSubmitEditing={submit}
              InputLeftElement={<Lock set="bold" size="small" />}
              onPressInputRightElement={() => setIsPasswordHidden(!isPasswordHidden)}
              InputRightElement={isPasswordHidden ?
                <Show set="bold" size="small" /> :
                <Hide set="bold" size="small" />}
              secureTextEntry={isPasswordHidden}
              placeholder={translate("common.password")}
            />
            <FormControl.ErrorMessage>{errors?.password}</FormControl.ErrorMessage>
          </FormControl>

          <Box height='4' />

          <Checkbox
            alignSelf="center"
            value="true"
            fontWeight="bold"
            borderRadius="lg"
            onChange={(value) => setIsRemember(value)}
            isChecked={isRemember}
          >
            <EduBody type="semibold" tx="letsIn.rememberMe" />
          </Checkbox>

          <Box height='4' />

          <EduButton displayShadow tx="common.signUp" onPress={submit} />

        </Column>

        <Box height='4' />

        <LinkButton text="" onPress={() => { }} />
        <Column flex={1}>
          <Flex flex={4} />
          <Row alignItems="center"
            justifyContent="center"
            marginLeft="4"
            marginRight="4"
          >
            <EduDivider flex={1} />
            <EduBody
              sizeT="xl"
              type="semibold"
              color="greyScale.700"
              marginLeft="4"
              marginRight="4"
              text={translate("letsIn.orContinueWith").toLocaleLowerCase()}
            />
            <EduDivider flex={1} />
          </Row>

          <Flex flex={[3, 1, 0.5, 0, 0]} />

          <Button
            alignSelf='center'
            variant='outline'
            borderRadius={16}
            width={20}
            height={60}
            leftIcon={<IconBrand icon="google" size="6" />}
            marginRight={"6"}
            marginLeft={"6"}
            onPress={handleLoginGoogle}
          />
          <Flex flex={4} />

          <Row justifyContent='center' alignItems={'center'} >
            <EduBody color="greyScale.500" type="regular"
              text={`${translate("letsIn.alreadyHaveAnAccount")} `} />
            <LinkButton
              tx="common.signIn"
              onPress={() => navigation.push("SignIn")}
            />
          </Row>
          <Flex flex={2} />
        </Column>
      </Column >
    </Screen >
  )
})



