import React from "react"
import { XStack } from "tamagui"
import {
  ChevronDown,
  EduInput,
  EduInputProps,
  IconBrand,
  IconSVG
} from "../../../components"
import { translate } from "../../../i18n"

export const PhoneInputIcon = () => {
  return (
    <XStack ai="center" space="$1.5" >
      <IconBrand icon="american" />
      <IconSVG size="$4" as={<ChevronDown set="light" />} />
    </XStack>
  )
}

export const PhoneInput = (props: EduInputProps) => {
  return (
    <EduInput
      key={"phone"}
      autoComplete="tel"
      InputLeftElement={<PhoneInputIcon />}
      placeholder={translate("common.phoneNumber")}
      {...props}
    />
  )
}



