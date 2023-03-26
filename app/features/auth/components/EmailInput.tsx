import React, { FC } from "react"
import { EduInputCustom, EduInputCustomProps, Message } from "../../../components"
import { translate } from "../../../i18n"

export const EmailInput: FC<EduInputCustomProps> = function EmailInput(props) {
  return (
    <EduInputCustom
      key={"email"}
      autoComplete="email"
      autoCorrect={false}
      keyboardType="email-address"
      autoCapitalize="none"
      placeholder={translate("common.email")}
      RightSVGIcon={<Message set="curved" />}
      {...props}
    />
  )
}



