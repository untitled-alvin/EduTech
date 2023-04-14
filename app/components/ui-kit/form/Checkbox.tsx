import React from "react"
import { Checkbox as CB, CheckboxProps as CBProps, XStack, XStackProps } from "tamagui"
import { AssetsIcon } from "../../assets-icon"

export type CheckboxProps = Omit<CBProps, 'style'> & { label?: JSX.Element, style?: XStackProps }

export const Checkbox = ({ style, checked, label, ...rest }: CheckboxProps) => (
  <XStack als="center" space="$2" {...style} >
    <CB
      bg={checked ? "$primary500" : "$background"}
      br="$2"
      bw={2.5}
      borderColor="$primary500"
      {...rest}
    >
      <CB.Indicator><AssetsIcon icon="check" /></CB.Indicator>
    </CB>
    {label}
  </XStack>
)