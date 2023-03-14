import { Icon, ISelectProps, Select } from "native-base"
import React, { FC, useState } from "react"
import { ChevronDown } from "../../../components"
import { translate } from "../../../i18n"
import { Gender } from "../models/User"


interface GenderSelectProps extends ISelectProps {
  selectedValue?: Gender
  defaultValue?: Gender
  onValueChange?: (value: Gender) => void
}

export const GenderSelect: FC<GenderSelectProps> = function GenderSelect(props) {

  return (
    <Select
      key="gender"
      variant="filled"
      borderRadius="12px"
      size="sm"
      height={12}
      fontWeight={"semibold"}
      accessibilityLabel="Choose Service"
      // defaultValue={"other"}
      // onValueChange={setGender}
      placeholder={translate("common.gender")}
      onValueChange={(value) => {
        if (!props.onValueChange) return
        if (value === "male") return props.onValueChange("male")
        if (value === "female") return props.onValueChange("female")
        if (value === "other") return props.onValueChange("other")
      }}
      dropdownIcon={
        <Icon
          as={<ChevronDown set="bold" size={"small"} />}
          alignSelf="center"
          marginRight={4}
          color="greyscale.900"
        />
      }
      {...props}
    >
      <Select.Item label="Other" value="other" />
      <Select.Item label="Male" value="male" />
      <Select.Item label="Female" value="female" />
    </Select>
  )
}



