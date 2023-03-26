import React from "react"
import { EduBody, EduBodyProps } from "../Typography"
import { AlertDialogDescription } from 'tamagui'

type EduDialogDescriptionProps = EduBodyProps

export function EduDialogDescription(props: EduDialogDescriptionProps) {
  return (
    <AlertDialogDescription>
      <EduBody textAlign="center" type="regular" sizeT="large" {...props} />
    </AlertDialogDescription>
  )
}
