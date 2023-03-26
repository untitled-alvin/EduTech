import React from "react"
import { EduButton, EduButtonProps, IconBrand } from "../../../components"

export const GoogleButton = (props: EduButtonProps) => {
  return <EduButton
    bg="white"
    alignSelf="center"
    preset="secondary"
    borderColor="$greyscale200"
    width="$20"
    borderRadius="$4"
    icon={<IconBrand icon="google" />}
    marginHorizontal="$6"
    {...props}
  />
}



