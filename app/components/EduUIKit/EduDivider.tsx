import React from "react"
import { Box, IBoxProps } from 'native-base';

export interface EduDividerProps extends IBoxProps {
  vertical?: boolean
}

export function EduDivider(props: EduDividerProps) {
  const { vertical = false, ...rest } = props

  return vertical ? (
    <Box width='px' backgroundColor='greyScale.200' {...rest} />
  ) : (
    <Box height='px' backgroundColor='greyScale.200'   {...rest} />
  )
}

