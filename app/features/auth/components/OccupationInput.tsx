import React, { FC } from "react"
import { Input, InputProps } from "../../../components"
import { translate } from "../../../i18n"

export const OccupationInput = (props: InputProps) => {
  return (
    <Input
      key={"occupation"}
      placeholder={translate("common.occupation")}
      {...props}
    />
  )
}



