import { Icon, Row } from "native-base"
import React, { FC } from "react"
import { ChevronDown, EduInput, EduInputProps, IconBrand, Message } from "../../../components"
import { translate } from "../../../i18n"

interface EmailInputProps extends EduInputProps { }

export const EmailInput: FC<EmailInputProps> = function EmailInput(props) {
  return (
    <EduInput
      key={"email"}
      autoComplete="email"
      autoCorrect={false}
      keyboardType="email-address"
      autoCapitalize="none"
      placeholder={translate("common.email")}
      InputRightElement={<Message set="curved" size={"small"} />}
      {...props}
    />
  )
}



