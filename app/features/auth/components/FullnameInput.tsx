import React from "react"
import { Input, InputProps } from "../../../components"
import { translate } from "../../../i18n"

export const FullnameInput = (props: InputProps) => {
  return (
    <Input
      key={"fullname"}
      autoComplete="name"
      placeholder={translate("common.fullName")}
      {...props}
    />
  )
}



