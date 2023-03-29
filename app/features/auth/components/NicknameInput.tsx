import React, { FC } from "react"
import { EduInput, EduInputProps } from "../../../components"
import { translate } from "../../../i18n"


export const NicknameInput: FC<EduInputProps> = function NicknameInput(props) {
  return (
    <EduInput
      key="nickname"
      autoComplete="username"
      placeholder={translate("common.nickname")}
      {...props}
    />
  )
}



