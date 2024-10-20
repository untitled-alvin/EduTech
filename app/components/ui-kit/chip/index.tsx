import React from "react"
import { Body, BodyProps } from "../typography/Body";
import { Button, ButtonProps, XStack } from "tamagui";
import { IconSVG, IconSVGProps } from "../icon/SVGIcon";

type Presets = keyof typeof $presets
type Sizes = keyof typeof $sizes

export type ChipProps = Omit<ButtonProps, "size"> & {
  /**
   * Text which is looked up via i18n.
   */
  tx?: BodyProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: BodyProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: BodyProps["txOptions"]
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
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
    preset = "filled",
    children,
    leftIcon,
    rightIcon,
    ...rest
  } = props

  const bodyProps = {
    ...{ tx, text, txOptions, children },
    ...$textTypes[preset],
    ...$textSizes[size],
  }
  const buttonProps = {
    ...$base,
    ...$presets[preset],
    ...$sizes[size],
    ...rest
  }
  const iconProps = {
    ...$iconSizes[size],
    color: preset === "filled" ? "white" : "$primary500"
  }

  return (
    <Button {...buttonProps} >
      <XStack space="$1" ai="center" ac="center" >
        {leftIcon && <IconSVG as={leftIcon} {...iconProps} />}
        <Body  {...bodyProps} />
        {rightIcon && <IconSVG as={rightIcon} {...iconProps} />}
      </XStack>
    </Button>
  )
}

const $base: ButtonProps = {
  padding: 0,
  borderColor: "$primary500",
  borderWidth: 1.5,
  borderRadius: 100,
  pressStyle: { opacity: 0.8 }
}

const $presets = {
  filled: { bc: "$primary500" } as ButtonProps,
  outline: { color: "$primary500" } as ButtonProps,
}

const $sizes = {
  large: { height: "$10", paddingHorizontal: "$6" } as ButtonProps,
  medium: { height: "$9", paddingHorizontal: "$5" } as ButtonProps,
  small: { height: "$8", paddingHorizontal: "$4" } as ButtonProps,
}

const $textTypes = {
  outline: { color: "$primary500" } as BodyProps,
  filled: { color: "white" } as BodyProps,
}

const $textSizes = {
  large: { preset: "xl", bold: true } as BodyProps,
  medium: { preset: "large", fontWeight: "semibold" } as BodyProps,
  small: { preset: "medium", fontWeight: "semibold" } as BodyProps,
}

const $iconSizes = {
  large: { size: "$4" } as IconSVGProps,
  medium: { size: "$3.5" } as IconSVGProps,
  small: { size: "$2.5" } as IconSVGProps,
}


