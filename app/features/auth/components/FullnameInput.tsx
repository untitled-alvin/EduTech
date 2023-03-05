import React, { FC } from "react"
import { EduInput, EduInputProps } from "../../../components"
import { translate } from "../../../i18n"

interface FullnameInputProps extends EduInputProps { }

export const FullnameInput: FC<FullnameInputProps> = function FullnameInput(props) {
  return (
    <EduInput
      key={"fullname"}
      autoComplete="name"
      placeholder={translate("common.fullName")}
      {...props}
    />
  )
}



