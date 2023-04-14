import React from "react"
import { Button, ButtonProps, BrandIcon } from "../../../components"

export const GoogleButton = (props: ButtonProps) => {
  return <Button
    alignSelf="center"
    preset="social"
    w="$20"
    br="$4"
    icon={<BrandIcon icon="google" />}
    marginHorizontal="$6"
    {...props}
  />
}



