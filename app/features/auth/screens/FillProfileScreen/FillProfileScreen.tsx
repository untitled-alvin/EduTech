import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef, useState } from "react"
import { YStack } from "tamagui"
import { AutoScrollView, BottomNavigator, EduButton, EduErrorMessage, EduShadow, Screen, SuccessDialog } from "../../../../components"
import { useStores } from "../../../../models"
import { AppStackScreenProps } from "../../../../navigators"
import { useLoadingService } from "../../../../services/loading"
import { delay } from "../../../../utils/delay"
import { ArrowLeftIcon, useHeader } from "../../../../utils/useHeader"
import {
  BirthdateInput,
  EmailInput,
  FullnameInput,
  GenderSelect,
  NicknameInput, PhoneInput
} from "../../components"
import { Gender } from "../../models/User"
import {
  validationBirthdate,
  validationEmail,
  validationFullname,
  validationNickname,
  validationOccupation,
  validationPhone
} from "../../validator"
import { FillProfileAvatarForm } from "./FillProfileAvatarForm"

interface FillProfileScreenProps extends AppStackScreenProps<"FillProfile"> { }

export const FillProfileScreen: FC<FillProfileScreenProps> = observer(function FillProfileScreen(_props) {
  const { navigation } = _props
  // const [isOpen, setIsOpen] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const { authenticationStore } = useStores()
  const loadingService = useLoadingService()

  const [errors, setErrors] = useState(undefined)
  const [fullname, setFullname] = useState(undefined)
  const [nickname, setNickname] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [birthdate, setBirthdate] = useState<Date>(undefined)
  const [phone, setPhone] = useState(undefined)
  const [gender, setGender] = useState<Gender>(undefined)

  useHeader({
    titleTx: "fillProfileScreen.fillYourProfile",
    LeftActionComponent: <ArrowLeftIcon />,
    onLeftPress: () => navigation.goBack(),
  })

  useEffect(() => {
    if (authenticationStore.user) {
      const {
        fullname: $userFullname,
        nickname: $userNickname,
        email: $userEmail,
        birthdate: $userBirthdate,
        phone: $userPhone,
        gender: $userGender,
      } = authenticationStore.user

      setFullname($userFullname)
      setNickname($userNickname)
      setEmail($userEmail)
      setBirthdate($userBirthdate)
      setPhone($userPhone)
      setGender($userGender)
    }
  }, [])

  const submit = async () => {
    // Validate and show problems 
    const problems = validation()
    const valid = !Object.values(problems).some((v) => !!v)
    setErrors(valid ? undefined : problems)

    if (!valid) return

    loadingService.showLoading()
    const result = await updateProfile()
    loadingService.hideLoading()

    if (result.kind !== "ok") {
      alert(result.kind)
    } else {
      setIsOpen(true)
      await Promise.all([delay(1000)])
      setIsOpen(false)
      navigation.pop()
    }
  }

  const updateProfile = async () => {
    return authenticationStore.update({
      ...authenticationStore.user,
      fullname,
      nickname,
      email,
      birthdate,
      phone,
      gender,
    })
  }

  const validation = () => {
    return {
      fullname: validationFullname(fullname),
      nickname: validationNickname(nickname),
      email: validationEmail(email),
      // country: validationCountry(country),
      birthdate: !birthdate ? 'Please select birthdate' : undefined,
      // birthdate: validationBirthdate(birthdate),
      phone: validationPhone(phone),
      gender: !gender ? "must select gender" : undefined,
      // gender: validationGender(gender),
    }
  }

  return (
    <Screen safeAreaEdges={["bottom", "left", "right"]} KeyboardAvoidingViewProps={{ enabled: false }}>
      <YStack width="$full" height="$full">
        <YStack flex={1}>
          <AutoScrollView style={{ paddingHorizontal: 24 }}>
            <FillProfileAvatarForm />
            <YStack h='$4' />

            <YStack>
              <FullnameInput
                error={!!errors?.fullname}
                value={fullname}
                onChangeText={setFullname}
                onSubmitEditing={submit}
              />
              <EduErrorMessage text={errors?.fullname} />
            </YStack>

            <YStack h='$2' />

            <YStack>
              <NicknameInput
                error={!!errors?.nickname}
                value={nickname}
                onChangeText={setNickname}
                onSubmitEditing={submit}
              />
              <EduErrorMessage text={errors?.nickname} />
            </YStack>

            <YStack h='$2' />


            <YStack>
              <BirthdateInput
                error={!!errors?.birthdate}
                value={birthdate}
                onChange={setBirthdate}
              />
              <EduErrorMessage text={errors?.birthdate} />
            </YStack>

            <YStack h='$2' />

            <YStack>
              <EmailInput
                error={!!errors?.email}
                editable={false}
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={submit}
              />
              <EduErrorMessage text={errors?.email} />
            </YStack>

            <YStack h='$2' />

            <YStack>
              <PhoneInput
                error={!!errors?.phone}
                key="phone"
                value={phone}
                onChangeText={setPhone}
                onSubmitEditing={submit}
              />
              <EduErrorMessage text={errors?.phone} />
            </YStack>

            <YStack h='$2' />

            <YStack>
              <GenderSelect value={gender} onValueChange={setGender} />
              <EduErrorMessage text={errors?.gender} />
            </YStack>

            <YStack h='$4' />

          </AutoScrollView>
        </YStack>
        <BottomNavigator position="relative" >
          <EduShadow preset="button_1">
            <EduButton tx="common.continue" onPress={submit} />
          </EduShadow>
        </BottomNavigator>
      </YStack >

      <SuccessDialog open={isOpen} />
    </Screen >
  )
})



