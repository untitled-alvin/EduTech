import React from "react"
import {
  EduBody,
  EduSelect,
  EduSelectItem,
  EduSelectProps,
  EduSelectScrollDownButton,
  EduSelectScrollUpButton,
  EduSelectTrigger
} from "../../../components"
import { translate } from "../../../i18n"
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
      source={Object.entries(genders).map(([key, value], i) => { return { key, name: key } })}
      {...props}
    />
  )
}