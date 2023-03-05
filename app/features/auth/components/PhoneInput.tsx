import { Icon, Row } from "native-base"
import React, { FC } from "react"
import { ChevronDown, EduInput, EduInputProps, IconBrand } from "../../../components"
import { translate } from "../../../i18n"

interface PhoneInputProps extends EduInputProps { }

export const PhoneInput: FC<PhoneInputProps> = function PhoneInput(props) {
  return (
    <EduInput
      key={"phone"}
      autoComplete="tel"
      InputLeftElement={<Row marginRight={4} alignItems="center" >
        <IconBrand key={"american"} icon="american" />
        <Icon
          key={"ChevronDown"}
          marginLeft={1.5}
          as={<ChevronDown set="light" size={"small"} />}
          color="greyScale.900" />
      </Row>}
      placeholder={translate("common.phoneNumber")}
      {...props}
    />
  )
}



