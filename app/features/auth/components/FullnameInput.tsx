import React from "react"
import { EduInputCustom, EduInputCustomProps } from "../../../components"
import { translate } from "../../../i18n"

export const FullnameInput = (props: EduInputCustomProps) => {
  return (
    <EduInputCustom
      key={"fullname"}
      autoComplete="name"
      placeholder={translate("common.fullName")}
      {...props}
    />
  )
}



