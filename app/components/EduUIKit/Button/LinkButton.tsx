import React from "react"
import { Button, IButtonProps } from 'native-base';
import { translate } from "../../../i18n"
import { EduBody, EduBodyProps } from "../Typography/EduBody";

export interface LinkButtonProps extends IButtonProps {
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
   * An optional style override for the button text.
   */
  textProps?: EduBodyProps
  /** 
   * Children components.
   */
  children?: React.ReactNode
}

export function LinkButton(props: LinkButtonProps) {
  const {
    tx, text, txOptions, textProps, children, ...rest
  } = props

  return (
    <Button height='6' variant='link' padding='0' margin='0' {...rest}>
      <EduBody bold
        sizeT="large"
        color="primary.500"
        {...{ tx, text, children, ...textProps }}
      />
    </Button>
  )
}

