import React, { FC } from "react"
import { EduInput, EduInputProps, Message } from "../../../components"
import { translate } from "../../../i18n"

export const EmailInput: FC<EduInputProps> = function EmailInput(props) {
  return (
    <EduInput
      key={"email"}
      autoComplete="email"
      autoCorrect={false}
      keyboardType="email-address"
      autoCapitalize="none"
      placeholder={translate("common.email")}
      RightIcon={<Message set="curved" />}
      {...props}
    />
  )
}



