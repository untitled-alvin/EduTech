import React, { FC } from "react"
import { EduInput, EduInputProps } from "../../../components"
import { translate } from "../../../i18n"

interface OccupationInputProps extends EduInputProps { }

export const OccupationInput: FC<OccupationInputProps> = function OccupationInput(props) {
  return (
    <EduInput
      key={"occupation"}
      placeholder={translate("common.occupation")}
      {...props}
    />
  )
}



