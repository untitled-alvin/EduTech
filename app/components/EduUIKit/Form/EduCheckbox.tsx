import React from "react"
import { Checkbox, CheckboxProps, XStack, XStackProps } from "tamagui"
import { AssetsIcon } from "../../AssetsIcon"

export type EduCheckboxProps = Omit<CheckboxProps, 'style'> & {
  label?: JSX.Element,
  style?: XStackProps
}

export function EduCheckbox(props: EduCheckboxProps) {
  const { style, label, ...rest } = props

  return (
    <XStack alignSelf="center" space="$2" {...style} >
      <Checkbox backgroundColor={props.checked ? "$primary500" : "white"}
        borderRadius="$2" borderWidth={2.5}
        borderColor="$primary500" {...rest}>
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