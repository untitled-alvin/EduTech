import React from "react"
import { XStack } from "tamagui"
import {
  ChevronDown,
  Input,
  InputProps,
  BrandIcon,
  IconSVG
} from "../../../components"
import { translate } from "../../../i18n"

export const PhoneInputIcon = () => {
  return (
    <XStack ai="center" space="$1.5" >
      <BrandIcon icon="american" />
      <IconSVG size="$4" as={<ChevronDown set="light" />} />
    </XStack>
  )
}

export const PhoneInput = (props: InputProps) => {
  return (
    <Input
      key={"phone"}
      autoComplete="tel"
      InputLeftElement={<PhoneInputIcon />}
      placeholder={translate("common.phoneNumber")}
      {...props}
    />
  )
}



