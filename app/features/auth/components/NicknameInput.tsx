import React, { FC } from "react"
import { EduInputCustom, EduInputCustomProps } from "../../../components"
import { translate } from "../../../i18n"


export const NicknameInput: FC<EduInputCustomProps> = function NicknameInput(props) {
  return (
    <EduInputCustom
      key="nickname"
      autoComplete="username"
      placeholder={translate("common.nickname")}
      {...props}
    />
  )
}



