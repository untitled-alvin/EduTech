import React from "react"
import { EduHeading, EduHeadingProps } from "../Typography"
import { AlertDialogTitle } from 'tamagui'

type EduDialogTitleProps = EduHeadingProps

export function EduDialogTitle(props: EduDialogTitleProps) {
  return (
    <AlertDialogTitle>
      <EduHeading textAlign="center" color="$primary500" preset="h4" {...props} />
    </AlertDialogTitle>
  )
}
