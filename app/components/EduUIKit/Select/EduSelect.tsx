import React, { forwardRef } from "react"
import { GetProps, Paragraph, Select, styled } from "tamagui"
import {
  Adapt,
  Sheet,
  SelectProps,
} from "tamagui"
import { EduSelectTrigger } from "./EduSelectTrigger"
import { EduBody } from "../Typography"
import { EduSelectItem, EduSelectScrollDownButton, EduSelectScrollUpButton } from "./EduSelectScrollButton"

// export type EduSelectProps = Omit<SelectProps, 'value' | 'defaultValue' | 'onValueChange'> & ExtraProps
// Even concise
const convertArrayToObject = (array, key: string) => {
  return array.reduce((acc, curr) => (acc[curr[key]] = curr, acc), {})
};

type SelectItem = { key: string, name: string }

type ExtraProps = {
  error?: boolean
  placeholder?: string
  label?: string
  source?: SelectItem[]
}

export type EduSelectProps = SelectProps & ExtraProps

// const CustomSelectValueFrame = styled(SelectValueFrame, {
//   // ...
// })

const CustomSelectValueFrame = styled(Paragraph, {
  name: 'CustomSelectValueFrame',
})


type SelectValueProps = GetProps<typeof CustomSelectValueFrame> & {
  placeholder?: React.ReactNode
}

// export const CustomSelectValue = themeable(
//   forwardRef<TamaguiElement, SelectValueProps>((propsIn, ref) => {
//     const { props } = useSelect(propsIn, { Text: CustomButtonText })
//     return <CustomButtonFrame {...props} ref={ref} />
//   })
// )

export const EduSelect = (props: EduSelectProps) => {
  const {
    error = false,
    placeholder,
    source,
    label,
    value,
    defaultValue,
    // onValueChange,
    ...rest
  } = props

  const filled = !value || !defaultValue
  const status = error ? "error" : filled ? "filled" : "empty"
  const map = convertArrayToObject(source, "key")
  const valueName = map[value || defaultValue]?.name

  return (
    <Select value={value} defaultValue={defaultValue} {...rest}>
      <EduSelectTrigger status={status}>
        {filled ?
          <EduBody text={valueName} textTransform={"capitalize"} /> :
          placeholder && <EduBody text={placeholder} />
        }
        {/* <Select.Value
          size="$14"
          // fow="700"
          // fontFamily="$header"
          // fontWeight="$11"
          // style={{
          //   color: "red"
          // }}
          // fontSize={33}
          color="$color"
          // backgroundColor='red'
          placeholder={placeholder}
        /> */}
        {/* <SelectValue1 placeholder={translate("common.gender")} /> */}
      </EduSelectTrigger>

      <Adapt platform="touch">
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <EduSelectScrollUpButton />

        <Select.Viewport minWidth={200}>
          <Select.Group space="$0">
            <Select.Label>{label}</Select.Label>
            {source.map(({ key, name }, i) => {
              return <EduSelectItem index={i} key={key} name={name} value={key} />
            })}
          </Select.Group>
        </Select.Viewport>
        <EduSelectScrollDownButton />
      </Select.Content>
    </Select>
  )
}