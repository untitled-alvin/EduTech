import React from "react"
import { EduBody } from "../../../../components"
import { XStack, XStackProps } from "tamagui"

type LessonSectionProps = {
  title?: string,
  duration?: string,
} & XStackProps

export const LessonSection = ({
  title = "Section 1 - Introduction", duration = "15 mins", ...rest
}: LessonSectionProps) => {
  return (
    <XStack marginHorizontal="$6" ai="center" jc="space-between" {...rest}>
      <EduBody weight="bold" size="large" color="$greyscale700" text={title} flex={1} />
      <EduBody weight="bold" size="large" color="$primary500" text={duration} />
    </XStack>
  )
}