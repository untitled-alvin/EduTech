import React, { useCallback, useState } from "react"
import { Button, Input, InputProps, styled, XStack, XStackProps } from "tamagui"
import { IconSVGProps, IconSVG } from "../SVGIcon"

type Status = keyof typeof $presets

const InputAction = styled(Button, {
  bg: "transparent",
  w: "$10",
  h: "$10",
  borderRadius: "$12"
})

export type EduInputCustomProps = InputProps & {
  error?: boolean
  InputLeftElement?: JSX.Element,
  InputRightElement?: JSX.Element,
  LeftSVGIcon?: JSX.Element,
  RightSVGIcon?: JSX.Element,
  onPressInputRightElement?: () => void
}

export function EduInputCustom(props: EduInputCustomProps) {
  const {
    error = false,
    InputLeftElement,
    InputRightElement,
    LeftSVGIcon,
    RightSVGIcon,
    onPressInputRightElement,
    onChangeText,
    ...rest
  } = props

  const [status, setStatus] = useState<Status>('empty')

  const onChangeTextWrapper = useCallback((text) => {
    onChangeText && onChangeText(text)
    text?.length ? setStatus('filled') : setStatus('empty')
  }, [onChangeText])

  const onBlur = useCallback((e) => {
    props.value?.length ? setStatus('filled') : setStatus('empty')
    props.onBlur?.call(e)
  }, [props.onBlur])

  const onFocus = useCallback((e) => {
    setStatus('focus')
    props.onFocus?.call(e)
  }, [props.onFocus])

  const entered = props.value?.length
  const preset = error ? $presets["error"] : entered ? $presets[status] : $presets["empty"]
  const actionStyle = error ? $actionPresets["error"] :
    entered ? $actionPresets[status] : $actionPresets["empty"]
  const container: XStackProps = {
    pl: LeftSVGIcon ? "$none" : "$3",
    pr: RightSVGIcon ? "$none" : "$3",
    ...preset,
  }

  return (
    <XStack {...container}>
      {LeftSVGIcon && <InputAction icon={<IconSVG as={LeftSVGIcon} {...actionStyle} />} />}
      {InputLeftElement && InputLeftElement}
      <Input
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
        hoverStyle={{ borderWidth: "$none" }}
        focusStyle={{ borderWidth: "$none" }}
        style={{ fontSize: 12 }}
        {...rest}
      />
      {InputRightElement && InputRightElement}
      {RightSVGIcon && (
        <InputAction icon={<IconSVG as={RightSVGIcon} {...actionStyle} />}
          onPress={onPressInputRightElement} />
      )}
    </XStack>
  )
}

const $action: IconSVGProps = { size: "$4" }

const $base: XStackProps = {
  h: "$12",
  w: "$full",
  bw: "$px",
  bg: "$greyscale200",
  ai: "center",
  borderRadius: "$3",
  // paddingHorizontal: "$0",
  // paddingHorizontal: "$3",
  space: "$2",
  marginVertical: "$0",
}

const $presets = {
  empty: { ...$base, borderColor: "$greyscale200" } as XStackProps,

  focus: { ...$base, borderColor: "$primary500", bg: "$primary50" } as XStackProps,

  filled: { ...$base, borderColor: "$greyscale200" } as XStackProps,

  error: { ...$base, borderColor: "$statusError" } as XStackProps
}

const $actionPresets = {
  empty: { ...$action, color: "$greyscale500" } as IconSVGProps,

  focus: { ...$action, color: "$primary500" } as IconSVGProps,

  filled: { ...$action, color: "$greyscale900" } as IconSVGProps,

  error: { ...$action, color: "$statusError" } as IconSVGProps
}

