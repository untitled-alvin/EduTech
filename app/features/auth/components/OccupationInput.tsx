import React, { FC } from "react"
import { EduInput, EduInputProps } from "../../../components"
import { translate } from "../../../i18n"

export const OccupationInput = (props: EduInputProps) => {
  return (
    <EduInput
      key={"occupation"}
      placeholder={translate("common.occupation")}
      {...props}
    />
  )
}



