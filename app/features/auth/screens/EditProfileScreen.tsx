import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef, useState } from "react"
import { YStack } from "tamagui"
import {
  BottomNavigator, EduButton, EduErrorMessage, EduShadow, Screen, SuccessDialog
} from "../../../components"
import { useStores } from "../../../models"
import { AppStackScreenProps } from "../../../navigators"
import { useLoadingService } from "../../../services/loading"
import { ArrowLeftIcon, useHeader } from "../../../utils/useHeader"
import {
  BirthdateInput,
  CountrySelect,
  EmailInput,
  FullnameInput,
  GenderSelect,
  NicknameInput,
  OccupationInput,
  PhoneInput
} from "../components"
import { Gender } from "../models/User"
import {
  validationBirthdate,
  validationEmail,
  validationFullname,
  validationNickname,
  validationOccupation,
  validationPhone
} from "../validator"

interface EditProfileScreenProps extends AppStackScreenProps<"EditProfile"> { }

export const EditProfileScreen: FC<EditProfileScreenProps> = observer(function EditProfileScreen(_props) {
  const { navigation } = _props
  const { authenticationStore } = useStores()
  const user = authenticationStore.user
  const $userFullname = user?.fullname
  const $userNickname = user?.nickname
  const $userEmail = user?.email
  const $userCountry = user?.country
  const $userBirthdate = user?.birthdate
  const $userPhone = user?.phone
  const $userGender = user?.gender
  const $userOccupation = user?.occupation

  const loadingService = useLoadingService()

  // const [isOpen, setIsOpen] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isDisable, setIsDisable] = useState(true)
  const [errors, setErrors] = useState(undefined)

  const [fullname, setFullname] = useState($userFullname)
  const [nickname, setNickname] = useState($userNickname)
  const [email, setEmail] = useState($userEmail)
  const [country, setCountry] = useState($userCountry)
  const [birthdate, setBirthdate] = useState<Date>($userBirthdate)
  const [phone, setPhone] = useState($userPhone)
  const [gender, setGender] = useState<Gender>($userGender)
  const [occupation, setOccupation] = useState($userOccupation)

  useHeader({
    titleTx: "editProfileScreen.header",
    LeftActionComponent: <ArrowLeftIcon />,
    onLeftPress: () => navigation.goBack(),
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  // useEffect(() => {
  //   setFullname($userFullname)
  //   setNickname($userNickname)
  //   setEmail($userEmail)
  //   setCountry($userCountry)
  //   setBirthdate($userBirthdate)
  //   setPhone($userPhone)
  //   setGender($userGender)
  //   setOccupation($userOccupation)
  // }, [])

  useEffect(() => {
    const isChanged =
      fullname !== $userFullname ||
      nickname !== $userNickname ||
      email !== $userEmail ||
      country !== $userCountry ||
      birthdate !== $userBirthdate ||
      phone !== $userPhone ||
      gender !== $userGender ||
      occupation !== $userOccupation

    setIsDisable(!isChanged)
  }, [fullname, nickname, email, country, birthdate, phone, gender, occupation])

  const fetchProfile = async () => {
    loadingService.showLoading()
    await authenticationStore.fetchProfile()
    loadingService.hideLoading()
  }

  const updateProfile = async () => {
    return authenticationStore.update({
      ...authenticationStore.user,
      fullname,
      nickname,
      email,
      country,
      birthdate,
      phone,
      gender,
      occupation,
    })
  }

  const validation = () => {
    return {
      fullname: validationFullname(fullname),
      nickname: validationNickname(nickname),
      email: validationEmail(email),
      // country: validationCountry(country),
      country: !country ? 'Please select country' : undefined,
      birthdate: !birthdate ? 'Please select birthdate' : undefined,
      // birthdate: validationBirthdate(birthdate),
      phone: validationPhone(phone),
      // phone: validationPhone(phone),
      gender: !gender ? "Must select gender" : undefined,
      occupation: validationOccupation(occupation),
    }
  }

  const submit = async () => {
    // Validate and show problems 
    const problems = validation()
    const valid = !Object.values(problems).some((v) => !!v)
    setErrors(valid ? undefined : problems)

    if (!valid) return

    loadingService.showLoading()
    const result = await updateProfile()
    loadingService.hideLoading()

    result.kind !== "ok" ? alert(result.kind) : setIsDisable(true)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["bottom", "left", "right"]}
      KeyboardAvoidingViewProps={{ enabled: true }}>
      <YStack h="$full" marginHorizontal="$6" space="$3">
        <YStack height="$2" />

        <YStack>
          <FullnameInput
            error={!!errors?.fullname}
            value={fullname}
            onChangeText={setFullname}
            onSubmitEditing={submit}
          />
          <EduErrorMessage text={errors?.fullname} />
        </YStack>

        <YStack>
          <NicknameInput
            error={!!errors?.nickname}
            value={nickname}
            onChangeText={setNickname}
            onSubmitEditing={submit}
          />
          <EduErrorMessage text={errors?.nickname} />
        </YStack>

        <YStack>
          <BirthdateInput
            error={!!errors?.birthdate}
            value={birthdate}
            onChange={setBirthdate}
          />
          <EduErrorMessage text={errors?.birthdate} />
        </YStack>


        <YStack>
          <EmailInput
            error={!!errors?.email}
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={submit}
          />
          <EduErrorMessage text={errors?.email} />
        </YStack>

        <YStack>
          <CountrySelect error={!!errors?.country} value={country} onValueChange={setCountry} />
          <EduErrorMessage text={errors?.country} />
        </YStack>

        <YStack>
          <PhoneInput
            error={!!errors?.phone}
            value={phone}
            onChangeText={setPhone}
            onSubmitEditing={submit}
          />
          <EduErrorMessage text={errors?.phone} />
        </YStack>

        <YStack>
          <GenderSelect
            error={errors?.gender}
            value={gender}
            onValueChange={setGender} />
          <EduErrorMessage text={errors?.gender} />
        </YStack>

        <YStack>
          <OccupationInput
            error={!!errors?.occupation}
            value={occupation}
            onChangeText={setOccupation}
            onSubmitEditing={submit}
          />
          <EduErrorMessage text={errors?.occupation} />
        </YStack>
      </YStack >
      {/* </AutoScrollView> */}

      <BottomNavigator>
        <EduShadow preset="button_1">
          <EduButton disabled={isDisable} tx="common.update" onPress={submit} />
        </EduShadow>
      </BottomNavigator>
      <SuccessDialog open />
    </Screen >
  )
})