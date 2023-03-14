import { observer } from "mobx-react-lite"
import { Box, FormControl } from "native-base"
import React, { FC, useEffect, useRef, useState } from "react"
import {
  AutoScrollView, BottomNavigator, EduButton, EduShadow, Screen, SuccessDialog
} from "../../../components"
import { useStores } from "../../../models"
import { AppStackScreenProps } from "../../../navigators"
import { useLoadingService } from "../../../services/loading"
import { useHeader } from "../../../utils/useHeader"
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

export const EditProfileScreen: FC<EditProfileScreenProps> = observer(
  function EditProfileScreen(_props) {
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
    const cancelRef = useRef(null)

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
      leftIcon: "arrowLeft",
      onLeftPress: () => navigation.goBack(),
      titleTx: "editProfileScreen.header"
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
        <Box height="full" marginLeft={6} marginRight={6}>
          {/* <AutoScrollView> */}
            <Box height="4" />

            <FormControl isInvalid={!!errors?.fullname} >
              <FullnameInput
                value={fullname}
                onChangeText={setFullname}
                onSubmitEditing={submit}
              />
              <FormControl.ErrorMessage >{errors?.fullname}</FormControl.ErrorMessage>
            </FormControl>

            <Box height="2" />

            <FormControl isInvalid={!!errors?.nickname} >
              <NicknameInput
                value={nickname}
                onChangeText={setNickname}
                onSubmitEditing={submit}
              />
              <FormControl.ErrorMessage >{errors?.nickname}</FormControl.ErrorMessage>
            </FormControl>

            <Box height="2" />

            <FormControl isInvalid={!!errors?.birthdate} >
              <BirthdateInput
                value={birthdate}
                onChange={setBirthdate}
              />
              <FormControl.ErrorMessage >{errors?.birthdate}</FormControl.ErrorMessage>
            </FormControl>

            <Box height="2" />

            <FormControl isInvalid={!!errors?.email} >
              <EmailInput
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={submit}
              />
              <FormControl.ErrorMessage >{errors?.email}</FormControl.ErrorMessage>
            </FormControl>

            <Box height="2" />

            <FormControl isInvalid={!!errors?.country} >
              <CountrySelect selectedValue={country} onValueChange={setCountry} />
              <FormControl.ErrorMessage >{errors?.country}</FormControl.ErrorMessage>
            </FormControl>
            
            <Box height="2" />

            <FormControl isInvalid={!!errors?.phone} >
              <PhoneInput
                value={phone}
                onChangeText={setPhone}
                onSubmitEditing={submit}
              />
              <FormControl.ErrorMessage >{errors?.phone}</FormControl.ErrorMessage>
            </FormControl>

            <Box height="2" />

            <FormControl isInvalid={!!errors?.gender} >
              <GenderSelect selectedValue={gender} onValueChange={setGender} />
              <FormControl.ErrorMessage >{errors?.gender}</FormControl.ErrorMessage>
            </FormControl>

            <Box height="2" />

            <FormControl isInvalid={!!errors?.occupation} >
              <OccupationInput
                value={occupation}
                onChangeText={setOccupation}
                onSubmitEditing={submit}
              />
              <FormControl.ErrorMessage >{errors?.occupation}</FormControl.ErrorMessage>
            </FormControl>
          {/* </AutoScrollView> */}
        </Box >

        <BottomNavigator>
        <EduShadow preset="button_1">
          <EduButton disabled={isDisable} tx="common.update" onPress={submit} />
          </EduShadow>
        </BottomNavigator>
        <SuccessDialog leastDestructiveRef={cancelRef} isOpen={isOpen} />
      </Screen >
    )
})

// const [fullname, setFullname] = useState(undefined)
// const [nickname, setNickname] = useState(undefined)
// const [email, setEmail] = useState(undefined)
// const [country, setCountry] = useState(undefined)
// const [birthdate, setBirthdate] = useState<Date>(undefined)
// const [phone, setPhone] = useState(undefined)
// const [gender, setGender] = useState<Gender>(undefined)
// const [occupation, setOccupation] = useState(undefined)

// const {
//   fullname: $userFullname,
//   nickname: $userNickname,
//   email: $userEmail,
//   country: $userCountry,
//   birthdate: $userBirthdate,
//   phone: $userPhone,
//   gender: $userGender,
//   occupation: $userOccupation,
// } = authenticationStore.user
    
// const [fullname, setFullname] = useState("Andrew Aisled")
// const [nickname, setNickname] = useState("Andrew")
// const [email, setEmail] = useState("andrew_ainsley@yourdomain.com")
// const [country, setCountry] = useState("united_states")
// const [birthdate, setBirthdate] = useState("12/27/1995")
// const [phone, setPhone] = useState("+1 111 467 378 399")
// const [gender, setGender] = useState("Other")
// const [occupation, setOccupation] = useState("Student")

// const [fullname, setFullname] = useState(userFullname)
// const [nickname, setNickname] = useState(userNickname)
// const [email, setEmail] = useState(userEmail)
// const [country, setCountry] = useState(userCountry)
// const [birthdate, setBirthdate] = useState(userBirthdate?.toString())
// const [phone, setPhone] = useState(userPhone)
// const [gender, setGender] = useState(userGender)
// const [occupation, setOccupation] = useState(userOccupation)

// const [fullname, setFullname] = useState("")
// const [nickname, setNickname] = useState("")
// const [email, setEmail] = useState("")
// const [birthdate, setBirthdate] = useState("")
// const [phone, setPhone] = useState("")
// const [gender, setGender] = useState("Other")