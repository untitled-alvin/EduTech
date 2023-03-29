import React from "react"
import { Checkbox, CheckboxProps, XStack, XStackProps } from "tamagui"
import { AssetsIcon } from "../../AssetsIcon"

export type EduCheckboxProps = Omit<CheckboxProps, 'style'> & {
  label?: JSX.Element,
  style?: XStackProps
}

export const EduCheckbox = ({ style, checked, label, ...rest }: EduCheckboxProps) => {
  return (
    <XStack alignSelf="center" space="$2" {...style} >
      <Checkbox
        bg={checked ? "$primary500" : "$background"}
        br="$2" bw={2.5} borderColor="$primary500" {...rest}>
        <Checkbox.Indicator ><AssetsIcon icon="check" /></Checkbox.Indicator>
      </Checkbox>
      {label}
    </XStack>
  )
}
// return (
//   <XStack alignSelf="center" space="$2">
//   <EduCheckbox
//     value="true"
//     checked={isRemember}
//     onCheckedChange={(value) => setIsRemember(!isRemember)} />
//   <EduBody type="semibold" tx="letsIn.rememberMe" />
// </XStack>
// )