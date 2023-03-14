import { observer } from "mobx-react-lite"
import { Box, Center, FormControl, } from "native-base"
import React, { FC, useEffect, useRef, useState } from "react"
import { AutoScrollView, BottomNavigator, EduButton, EduShadow, Screen, SuccessDialog } from "../../../../components"
import { useStores } from "../../../../models"
import { AppStackScreenProps } from "../../../../navigators"
import { useLoadingService } from "../../../../services/loading"
import { delay } from "../../../../utils/delay"
import { useHeader } from "../../../../utils/useHeader"
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

export const FillProfileScreen: FC<FillProfileScreenProps> = observer(function FillProfileScreen(
  _props
) {
  const { navigation } = _props
  // const [isOpen, setIsOpen] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const { authenticationStore } = useStores()
  const loadingService = useLoadingService()
  const cancelRef = useRef(null)

  const [errors, setErrors] = useState(undefined)
  const [fullname, setFullname] = useState(undefined)
  const [nickname, setNickname] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [birthdate, setBirthdate] = useState<Date>(undefined)
  const [phone, setPhone] = useState(undefined)
  const [gender, setGender] = useState<Gender>(undefined)

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

  useHeader({
    leftIcon: "arrowLeft",
    onLeftPress: () => navigation.goBack(),
    titleTx: "fillProfileScreen.fillYourProfile"
  })

  return (
    <Screen safeAreaEdges={["bottom", "left", "right"]}
      KeyboardAvoidingViewProps={{ enabled: false }}>

      <Center width={"full"} height="full">
        <Box width={"full"} flex={1}>


          <AutoScrollView style={{ paddingHorizontal: 24 }}>
            <FillProfileAvatarForm />
            <Box height='4' />

            <FormControl isInvalid={!!errors?.fullname} >
              <FullnameInput
                value={fullname}
                onChangeText={setFullname}
                onSubmitEditing={submit}
              />
              <FormControl.ErrorMessage >{errors?.fullname}</FormControl.ErrorMessage>
            </FormControl>

            <Box height='2' />

            <FormControl isInvalid={!!errors?.nickname} >
              <NicknameInput
                value={nickname}
                onChangeText={setNickname}
                onSubmitEditing={submit}
              />
              <FormControl.ErrorMessage >{errors?.nickname}</FormControl.ErrorMessage>
            </FormControl>

            <Box height='2' />

            <FormControl isInvalid={!!errors?.birthdate} >
              <BirthdateInput
                value={birthdate}
                onChange={setBirthdate}
              />
              <FormControl.ErrorMessage >{errors?.birthdate}</FormControl.ErrorMessage>
            </FormControl>

            <Box height='2' />

            <FormControl isInvalid={!!errors?.email} >
              <EmailInput
                isReadOnly
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={submit}
              />
              <FormControl.ErrorMessage >{errors?.email}</FormControl.ErrorMessage>
            </FormControl>

            <Box height='2' />

            <FormControl isInvalid={!!errors?.phone} >
              <PhoneInput
                key={"phone"}
                value={phone}
                onChangeText={setPhone}
                onSubmitEditing={submit}
              />
              <FormControl.ErrorMessage >{errors?.phone}</FormControl.ErrorMessage>
            </FormControl>

            <Box height='2' />

            <FormControl isInvalid={!!errors?.gender} >
              <GenderSelect
                key={"gender"}
                selectedValue={gender}
                onValueChange={setGender}
              />
              <FormControl.ErrorMessage >{errors?.gender}</FormControl.ErrorMessage>
            </FormControl>

            <Box height="4" />

          </AutoScrollView>
        </Box>
        <BottomNavigator position="relative" >
          <EduShadow preset="button_1">
            <EduButton tx="common.continue" onPress={submit} />
          </EduShadow>
        </BottomNavigator>
      </Center >



      <SuccessDialog leastDestructiveRef={cancelRef} isOpen={isOpen} />
    </Screen >
  )
})



