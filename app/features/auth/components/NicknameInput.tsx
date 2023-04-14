import React, { FC } from "react"
import { Input, InputProps } from "../../../components"
import { translate } from "../../../i18n"


export const NicknameInput: FC<InputProps> = function NicknameInput(props) {
  return (
    <Input
      key="nickname"
      autoComplete="username"
      placeholder={translate("common.nickname")}
      {...props}
    />
  )
}



