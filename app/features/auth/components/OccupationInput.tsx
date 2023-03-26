import React, { FC } from "react"
import { EduInputCustom, EduInputCustomProps } from "../../../components"
import { translate } from "../../../i18n"

export const OccupationInput = (props: EduInputCustomProps) => {
  return (
    <EduInputCustom
      key={"occupation"}
      placeholder={translate("common.occupation")}
      {...props}
    />
  )
}



