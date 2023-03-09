import React from "react"
import { Box, Button, IButtonProps, Icon, Row } from 'native-base';
import { EduBody, EduBodyProps } from "../Typography/EduBody";

type Types = keyof typeof $typeProps
type Sizes = keyof typeof $sizeProps

export interface ChipProps extends IButtonProps {
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
  /** 
   * Children components.
   */
  // leftIcon?: React.ReactNode
}

export function Chip(props: ChipProps) {
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
  const iconColor = type === "filled" ? "white" : "primary.500"
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
      <Row flex={1} alignItems={"center"}  >
        {leftIcon ? <Icon as={leftIcon} marginRight={2} color={iconColor} /> : <Box />}
        <EduBody  {...bodyProps} />
        {rightIcon ? <Icon as={rightIcon} marginLeft={2} color={iconColor} /> : <Box />}
      </Row>
    </Button>
  )
}

const $baseProps: IButtonProps = {
  borderColor: 'primary.500',
  opacity: 1,
  borderWidth: '1.5',
  padding: 0,
  borderRadius: "100",
  alignItems: "center",
  justifyContent: "center",
  alignContent: "center",
  alignSelf: "center"
  // fontSize: "sm",
}

const $typeProps = {
  filled: { ...$baseProps, variant: "solid" } as IButtonProps,
  outline: { ...$baseProps, variant: "outline" } as IButtonProps,
}

const $sizeProps = {
  large: {
    height: "10",
    paddingLeft: "6",
    paddingRight: "6",
  } as IButtonProps,

  medium: {
    height: "9",
    paddingLeft: "5",
    paddingRight: "5",
  } as IButtonProps,

  small: {
    height: "8",
    paddingLeft: "4",
    paddingRight: "4",
  } as IButtonProps,
}

const $textTypeProps = {
  outline: { color: "primary.500" } as EduBodyProps,
  filled: { color: "white" } as EduBodyProps,
}

const $textSizeProps = {
  large: { preset: "xl", bold: true } as EduBodyProps,
  medium: { preset: "large", fontWeight: "semibold" } as EduBodyProps,
  small: { preset: "medium", fontWeight: "semibold" } as EduBodyProps,
}


// preset = "large"
// type = "semibold"
// color = { preset === "selected" ? "white" : "primary.500"}
// numberOfLines = { 1}
// text={title}


