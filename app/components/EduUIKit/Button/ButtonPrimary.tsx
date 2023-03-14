import React from "react"
import { Button, IButtonProps } from 'native-base';
import { colors } from "../theme/colors";

export function FilledButton(props: IButtonProps) {
  return (
    <Button
      // shadow={5}
      variant="solid"
      background={"primary.500"}
      // colorScheme={"primary"}
      // rounded={roundedT ? "3xl" : "xl"}
      // isDisabled={disabled ?? isDisabled}
      opacity={1}
      _icon={{ opacity: 1, color: "white" }}
      _text={{ fontWeight: "bold", fontSize: "md", color: "white" }}
      // _pressed
      _pressed={{
        // opacity: 1,
        bg: "status.disabledButton",
      }}
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

