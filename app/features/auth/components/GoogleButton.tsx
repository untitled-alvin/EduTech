import React from "react"
import { EduButton, EduButtonProps, IconBrand } from "../../../components"

export const GoogleButton = (props: EduButtonProps) => {
  return <EduButton
    alignSelf="center"
    preset="social"
    w="$20"
    br="$4"
    icon={<IconBrand icon="google" />}
    marginHorizontal="$6"
    {...props}
  />
}



