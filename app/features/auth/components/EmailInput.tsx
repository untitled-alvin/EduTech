import React, { FC } from "react"
import { Input, InputProps, Message } from "../../../components"
import { translate } from "../../../i18n"

export const EmailInput: FC<InputProps> = function EmailInput(props) {
  return (
    <Input
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



