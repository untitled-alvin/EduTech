import React, { useCallback, useState } from "react"
import {
  Button,
  Input as TInput,
  InputProps as TInputProps,
  styled,
  XStack,
  XStackProps
} from "tamagui"
import { IconSVGProps, IconSVG } from "../icon/SVGIcon"

type Status = keyof typeof $presets

const InputAction = styled(Button, {
  bg: "transparent",
  w: "$10",
  h: "$10",
  borderRadius: "$12"
})

const InputFrame = styled(XStack, {
  name: "Input",
  h: "$12",
  w: "$full",
  bw: "$px",
  bg: "$background",
  ai: "center",
  borderRadius: "$3",
  borderColor: "transparent",
  // paddingHorizontal: "$0",
  // paddingHorizontal: "$3",
  space: "$2",
  marginVertical: "$0"
})

export type InputProps = TInputProps & {
  error?: boolean
  InputLeftElement?: JSX.Element,
  InputRightElement?: JSX.Element,
  LeftIcon?: JSX.Element,
  RightIcon?: JSX.Element,
  onPressRightIcon?: () => void
}

export const Input = InputFrame.extractable((props: InputProps) => {
  const {
    error = false,
    InputLeftElement,
    InputRightElement,
    LeftIcon,
    RightIcon,
    onPressRightIcon,
    onChangeText,
    ...rest
  } = props

  const [focused, setFocused] = useState(false)

  const onChangeTextWrapper = useCallback((text) => {
    onChangeText && onChangeText(text)
  }, [onChangeText])

  const onBlur = useCallback((e) => {
    setFocused(false)
    props.onBlur?.call(e)
  }, [props.onBlur])

  const onFocus = useCallback((e) => {
    setFocused(true)
    props.onFocus?.call(e)
  }, [props.onFocus])

  const entered = props.value?.length
  const status: Status = error ? "error" : focused ? "focus" : entered ? "filled" : "empty"
  const container: XStackProps = {
    pl: LeftIcon ? "$none" : "$3",
    pr: RightIcon ? "$none" : "$3",
    ...$presets[status]
  }

  return (
    <InputFrame {...container}>
      {LeftIcon && <InputAction icon={<IconSVG as={LeftIcon} {...$actionPresets[status]} />} />}
      {InputLeftElement && InputLeftElement}
      <TInput
        flex={1}
        onBlur={onBlur}
        onFocus={onFocus}
        onChangeText={onChangeTextWrapper}
        backgroundColor="transparent"
        paddingHorizontal="$none"
        // paddingHorizontal="$2"
        borderWidth="$none"
        fontWeight="$semibold"
        fontSize="$sm"
        hoverStyle={{ bw: "$none" }}
        focusStyle={{ bw: "$none" }}
        style={{ fontSize: 12 }}
        {...rest}
      />
      {InputRightElement && InputRightElement}
      {RightIcon && <InputAction icon={<IconSVG as={RightIcon} {...$actionPresets[status]} />} onPress={onPressRightIcon} />}
    </InputFrame>
  )
})

const $action: IconSVGProps = { size: "$4" }

const $base: XStackProps = {
  h: "$12",
  w: "$full",
  bw: "$px",
  bg: "$background",
  ai: "center",
  borderRadius: "$3",
  borderColor: "transparent",
  // paddingHorizontal: "$0",
  // paddingHorizontal: "$3",
  space: "$2",
  marginVertical: "$0",
}

const $presets = {
  empty: { ...$base } as XStackProps,

  filled: { ...$base } as XStackProps,

  focus: { ...$base, bg: '$primary100', borderColor: "$primary500" } as XStackProps,

  error: { ...$base, borderColor: "$statusError" } as XStackProps
}

const $actionPresets = {
  empty: { ...$action, color: "$greyscale500" } as IconSVGProps,

  filled: { ...$action } as IconSVGProps,

  focus: { ...$action, color: "$primary500" } as IconSVGProps,

  error: { ...$action, color: "$statusError" } as IconSVGProps
}