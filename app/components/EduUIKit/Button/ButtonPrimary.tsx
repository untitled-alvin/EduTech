import React from "react"
import { Button, IButtonProps } from 'native-base';
import { colors } from "../theme/colors";

export function FilledButton(props: IButtonProps) {
  return (
    <Button
      // shadow={5}
      variant='solid'
      // rounded={roundedT ? "3xl" : "xl"}
      // isDisabled={disabled ?? isDisabled}
      opacity={1}
      _icon={{ opacity: 1, color: "white" }}
      _text={{ fontWeight: "bold", fontSize: "md", color: "white" }}
      _disabled={{
        opacity: 1,
        bg: colors.disabledButton,
        _text: { color: "white" },
        _icon: { opacity: 1, color: "white" },
      }}
      {...props}
    />
  )

  // return (
  //   <Button
  //     // disabled
  //     // fontWeight="bold"
  //     // fontSize="4xl"
  //     // textAlign="left"
  //     variant='solid'
  //     height='12'
  //     {...rest}
  //   >
  //     <EduBody
  //       bold
  //       sizeT="large"
  //       lineHeight="md"
  //       color={"white"}
  //       children={content}
  //     />
  //   </Button>
  // )
}

