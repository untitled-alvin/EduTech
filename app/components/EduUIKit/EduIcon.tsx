import React from "react"
import { EduBody, EduBodyProps } from "./Typography/EduBody";
import { Button, ButtonProps, XStack } from "tamagui";

type Types = keyof typeof $typeProps
type Sizes = keyof typeof $sizeProps

export type EduIcon = ButtonProps & {
  /**
   * Text which is looked up via i18n.
   */
  tx?: EduBodyProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: EduBodyProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: EduBodyProps["txOptions"]
  /**
   * One of the different types of text presets.
   */
  type?: Types
  /**
   * One of the different types of text presets.
   */
  sizeT?: Sizes
  /** 
   * Children components.
   */
  children?: React.ReactNode

  leftIcon?: React.ReactNode

  rightIcon?: React.ReactNode
}

export function Chip(props: EduIcon) {
  const {
    tx,
    text,
    txOptions,
    children,
    leftIcon,
    rightIcon,
    ...rest
  } = props

  const type: Types = $typeProps[props.type] ? props.type : "filled"
  const size: Sizes = $sizeProps[props.sizeT] ? props.sizeT : "medium"
  const color = type === "filled" ? "white" : "$primary500"
  const bodyProps = {
    ...{ tx, text, txOptions, children },
    ...$textTypeProps[type],
    ...$textSizeProps[size],
  }
  const buttonProps = {
    ...$typeProps[type],
    ...$sizeProps[size],
    ...rest
  }

  return (
    <Button {...buttonProps} >
      <XStack space="$1" ai="center" ac="center" >
        {leftIcon ? leftIcon : <XStack />}
        <EduBody  {...bodyProps} />
        {rightIcon ? rightIcon : <XStack />}
      </XStack>
    </Button>
  )
}

const $baseProps: ButtonProps = {
  padding: 0,
  borderColor: '$primary500',
  borderWidth: 1.5,
  borderRadius: 100,
}

const $typeProps = {
  filled: {
    ...$baseProps,
    bc: "$primary500",
    // color: "white",
    pressStyle: { bc: "$primary700" }
  } as ButtonProps,

  outline: {
    ...$baseProps,
    bc: "white",
    // color: "$primary500",
    pressStyle: { bc: "$primary200" }
  } as ButtonProps,
}

const $sizeProps = {
  large: {
    height: "$10",
    paddingHorizontal: "$6",
  } as ButtonProps,

  medium: {
    height: "$9",
    paddingHorizontal: "$5",
  } as ButtonProps,

  small: {
    height: "$8",
    paddingHorizontal: "$4",
  } as ButtonProps,
}

const $textTypeProps = {
  outline: { color: "$primary500" } as EduBodyProps,
  filled: { color: "white" } as EduBodyProps,
}

const $textSizeProps = {
  large: { preset: "xl", bold: true } as EduBodyProps,
  medium: { preset: "large", fontWeight: "semibold" } as EduBodyProps,
  small: { preset: "medium", fontWeight: "semibold" } as EduBodyProps,
}


