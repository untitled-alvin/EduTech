import React, { FC } from "react"
import { EduInput, EduInputProps } from "../../../components"
import { translate } from "../../../i18n"

interface NicknameInputProps extends EduInputProps { }

export const NicknameInput: FC<NicknameInputProps> = function NicknameInput(props) {
  return (
    <EduInput
      key={"nickname"}
      autoComplete="username"
      placeholder={translate("common.nickname")}
      {...props}
    />
  )
}



