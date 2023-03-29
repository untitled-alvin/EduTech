import React from "react"
import { EduInput, EduInputProps } from "../../../components"
import { translate } from "../../../i18n"

export const FullnameInput = (props: EduInputProps) => {
  return (
    <EduInput
      key={"fullname"}
      autoComplete="name"
      placeholder={translate("common.fullName")}
      {...props}
    />
  )
}



