import React from "react"
import { XStack, XStackProps } from "tamagui"
import { Body } from "../../../../components"

export const LessonSection = (props: { title?: string, duration?: string } & XStackProps) => {
  const {
    duration = "15 mins",
    title = "Section 1 - Introduction",
    ...rest
  } = props

  return (
    <XStack marginHorizontal="$6" ai="center" jc="space-between" {...rest}>
      <Body weight="bold" size="large" color="$greyscale700" text={title} flex={1} />
      <Body weight="bold" size="large" color="$primary500" text={duration} />
    </XStack>
  )
}