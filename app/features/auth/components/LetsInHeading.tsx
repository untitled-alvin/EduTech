import React from "react"
import { EduHeading, EduHeadingProps } from "../../../components/EduUIKit/Typography/EduHeading"

export function LestInHeading(props: EduHeadingProps) {
  return (
    <EduHeading
      // marginTop={8}
      // marginBottom={8}
      // fontSize={{
      //   base: "5xl",
      //   sm: "7xl",
      //   // md: "4xl",
      //   // md: "5xl",
      //   // lg: "5xl",
      //   // xl: "5xl",
      // }}
      preset="h1"
      {...props}
    />
  )
}

