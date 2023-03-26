import React from "react"
import { XStack } from "tamagui"
import {
  ChevronDown,
  EduInputCustom,
  EduInputCustomProps,
  IconBrand,
  IconSVG
} from "../../../components"
import { translate } from "../../../i18n"

export const PhoneInputIcon = () => {
  return (
    <XStack ai="center" space="$1.5" >
      <IconBrand icon="american" />
      <IconSVG size="$4" as={<ChevronDown set="light" />} color="$greyscale900" />
    </XStack>
  )
}

export const PhoneInput = (props: EduInputCustomProps) => {
  return (
    <EduInputCustom
      key={"phone"}
      autoComplete="tel"
      InputLeftElement={<PhoneInputIcon />}
      placeholder={translate("common.phoneNumber")}
      {...props}
    />
  )
}



