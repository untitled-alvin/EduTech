import React, { FC } from "react"
import { EduSelect, EduSelectProps } from "../../../components"
import { translate } from "../../../i18n"

export type CountrySelectProps = EduSelectProps & {}

export const CountrySelect = (props: CountrySelectProps) => {
  return (
    <EduSelect
      id="country"
      source={items}
      label={translate("common.country")}
      placeholder={translate("common.country")}
      {...props}
    />
  )
}

const items = [
  { key: "vietnam", name: "Vietnam" },
  { key: "united_states", name: "United States" },
  { key: "thailand", name: "Thailand" },
  { key: "australia", name: "Australia" },
  { key: "china", name: "China" },
  { key: "france", name: "France" },
]
