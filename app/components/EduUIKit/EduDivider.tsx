import React from "react"
import { YStack, YStackProps } from "tamagui";

export interface EduDividerProps extends YStackProps { vertical?: boolean }

export function EduDivider(props: EduDividerProps) {
  const { vertical = false, ...rest } = props

  return vertical ? (
    <YStack width='$px' bg='$divider' {...rest} />
  ) : (
    <YStack height='$px' bg='$divider' {...rest} />
  )
}

