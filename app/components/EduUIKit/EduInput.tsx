import { Icon, IInputProps, Input } from "native-base"
import React, { useCallback, useEffect, useState } from "react"
import { colors } from "./theme"

export interface EduInputProps extends IInputProps {
  onPressInputRightElement?: () => void
}

export function EduInput(props: EduInputProps) {
  const {
    InputLeftElement,
    InputRightElement,
    onPressInputRightElement,
    onChangeText,
    ...rest
  } = props

  const [focused, setFocused] = useState(false)
  const [filled, setFilled] = useState(false)
  const onChangeTextWrapper = useCallback((text) => {
    onChangeText && onChangeText(text)
    text?.length ? setFilled(true) : setFilled(false)
  }, [onChangeText])

  useEffect(() => {
    setFilled(!!props?.value?.length)
  }, [])

  const iconColor = focused ? "primary.500" : (
    props?.value?.length || filled ? "greyScale.900" : "greyScale.500"
  )

  return (
    <Input
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChangeText={onChangeTextWrapper}
      // value={authEmail}
      // onChangeText={setAuthEmail}
      // autoComplete="email"
      // autoCorrect={false}
      // keyboardType="email-address"
      // autoCapitalize="none"
      // placeholder={translate("loginScreen.emailFieldPlaceholder")}
      // onSubmitEditing={login}
      InputLeftElement={
        InputLeftElement && (<Icon
          as={InputLeftElement}
          marginLeft={4}
          color={iconColor} />)
      }
      InputRightElement={
        InputRightElement && (<Icon
          onPress={onPressInputRightElement}
          as={InputRightElement}
          marginRight={4}
          color={iconColor} />)
      }
      variant="filled"
      borderRadius='12px'
      size='sm'
      height={12}
      fontWeight={'semibold'}
      _invalid={{
        borderWidth: "1",
        borderColor: colors.error,
      }}
      {...rest}
    />
  )
}