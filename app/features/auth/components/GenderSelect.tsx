import React from "react"
import { EduSelect, EduSelectProps } from "../../../components"
import { translate } from "../../../i18n"
import { capitalize } from "../../../utils/string"
import { Gender, genders } from "../models/User"

export type GenderSelectProps = Omit<EduSelectProps, 'value' | 'defaultValue' | 'onValueChange'> & {
  value?: Gender
  defaultValue?: Gender
  onValueChange?: (value: Gender) => void
}

export const GenderSelect = (props: GenderSelectProps) => {
  return (
    <EduSelect
      id="gender"
      label={translate("common.gender")}
      placeholder={translate("common.gender")}
      source={Object.entries(genders).map(([key, value], i) => { return { key, name: capitalize(key) } })}
      {...props}
    />
  )
}