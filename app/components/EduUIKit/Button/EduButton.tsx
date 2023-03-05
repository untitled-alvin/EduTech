import React from "react"
import { translate } from "../../../i18n"
import { FilledButton } from "./ButtonPrimary";
import { ButtonSecondary } from "./ButtonSecondary";
import { IButtonProps } from "native-base";
import { EduBodyProps } from "../Typography/EduBody";

export type EduButtonPresets = "primary" | "secondary"

export interface EduButtonProps extends IButtonProps {
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

  isRounded?: boolean

  displayShadow?: boolean

  preset?: EduButtonPresets
}

export function EduButton(props: EduButtonProps) {
  const {
    tx,
    text,
    txOptions,
    children,
    disabled,
    isRounded = true,
    displayShadow = false,
    preset = "primary",
    isDisabled,
    ...rest
  } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = children || text || i18nText
  const childrenProps = { children: content }
  const shadowProps = displayShadow ? { shadow: 5 } : {}

  if (preset === "secondary") {
    return (
      <ButtonSecondary
        rounded={isRounded ? "3xl" : "xl"}
        isDisabled={disabled ?? isDisabled}
        {...shadowProps}
        {...childrenProps}
        {...rest}
      />
    )
  }

  return (
    <FilledButton
      rounded={isRounded ? "3xl" : "xl"}
      isDisabled={disabled ?? isDisabled}
      {...shadowProps}
      {...childrenProps}
      {...rest}
    />
  )
}
