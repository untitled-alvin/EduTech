import { Icon, ISelectProps, Select } from "native-base"
import React, { FC } from "react"
import { ChevronDown } from "../../../components"
import { translate } from "../../../i18n"

interface CountrySelectProps extends ISelectProps { }

export const CountrySelect: FC<CountrySelectProps> = function CountrySelect(props) {
  return (
    <Select
      key="country"
      variant="filled"
      borderRadius="12px"
      size="sm"
      height={12}
      fontWeight={"semibold"}
      // accessibilityLabel="Choose Service"
      placeholder={translate("common.country")}
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
      <Select.Item label="Vietnam" value="Vietnam" />
      <Select.Item label="United States" value="United States" />
      <Select.Item label="Thailand" value="Thailand" />
      <Select.Item label="Australia" value="Australia" />
      <Select.Item label="China" value="China" />
      <Select.Item label="France" value="France" />
    </Select>
  )
}



