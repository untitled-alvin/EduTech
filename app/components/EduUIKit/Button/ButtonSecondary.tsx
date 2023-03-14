import React from "react"
import { Button, IButtonProps } from 'native-base';
import { colors } from "../theme";

export function ButtonSecondary(props: IButtonProps) {
  return (
    <Button
      // rounded={roundedT ? "3xl" : "xl"}
      // isDisabled={disabled ?? isDisabled}
      opacity={1}
      variant="subtle"
      _icon={{ opacity: 1, color: "primary.500" }}
      _text={{ fontWeight: "bold", fontSize: "md", color: "primary.500" }}
      _disabled={{
        opacity: 1,
        bg: "status.disabledButton",
        _text: { color: "white" },
        _icon: { opacity: 1, color: "white" },
      }}
      {...props}
    />
  )
}

