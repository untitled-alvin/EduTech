import React from "react"
import { YStack, YStackProps } from "tamagui";

export interface EduDividerProps extends YStackProps {
  vertical?: boolean
}

export function EduDivider(props: EduDividerProps) {
  const { vertical = false, ...rest } = props

  return vertical ? (
    <YStack width='$px' backgroundColor='$greyscale200' {...rest} />
  ) : (
    <YStack height='$px' backgroundColor='$greyscale200'   {...rest} />
  )
}

