import React from "react"
import { EduBody, EduBodyProps } from "./Typography/EduBody";
import { Button, ButtonProps, XStack } from "tamagui";
import { IconSVG, IconSVGProps } from "./SVGIcon";

type Types = keyof typeof $types
type Sizes = keyof typeof $sizes

export type ChipProps = Omit<ButtonProps, 'size'> & {
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
  size?: Sizes
  /** 
   * Children components.
   */
  children?: React.ReactNode

  leftIcon?: React.ReactNode

  rightIcon?: React.ReactNode
}

export function Chip(props: ChipProps) {
  const {
    tx,
    text,
    txOptions,
    size = "medium",
    type = "filled",
    children,
    leftIcon,
    rightIcon,
    ...rest
  } = props

  const bodyProps = {
    ...{ tx, text, txOptions, children },
    ...$textTypes[type],
    ...$textSizes[size],
  }
  const buttonProps = {
    ...$base,
    ...$types[type],
    ...$sizes[size],
    ...rest
  }
  const iconProps = {
    ...$iconSizes[size],
    color: type === "filled" ? "white" : "$primary500"
  }

  return (
    <Button {...buttonProps} >
      <XStack space="$1" ai="center" ac="center" >
        {leftIcon && <IconSVG as={leftIcon} {...iconProps} />}
        <EduBody  {...bodyProps} />
        {rightIcon && <IconSVG as={rightIcon} {...iconProps} />}
      </XStack>
    </Button>
  )
}

const $base: ButtonProps = {
  padding: 0,
  borderColor: '$primary500',
  borderWidth: 1.5,
  borderRadius: 100,
}

const $types = {
  filled: { bc: "$primary500" } as ButtonProps,
  outline: { color: "$primary500" } as ButtonProps,
}

const $sizes = {
  large: { height: "$10", paddingHorizontal: "$6" } as ButtonProps,
  medium: { height: "$9", paddingHorizontal: "$5" } as ButtonProps,
  small: { height: "$8", paddingHorizontal: "$4" } as ButtonProps,
}

const $textTypes = {
  outline: { color: "$primary500" } as EduBodyProps,
  filled: { color: "white" } as EduBodyProps,
}

const $textSizes = {
  large: { preset: "xl", bold: true } as EduBodyProps,
  medium: { preset: "large", fontWeight: "semibold" } as EduBodyProps,
  small: { preset: "medium", fontWeight: "semibold" } as EduBodyProps,
}

const $iconSizes = {
  large: { size: "$4" } as IconSVGProps,
  medium: { size: "$3.5" } as IconSVGProps,
  small: { size: "$2.5" } as IconSVGProps,
}


