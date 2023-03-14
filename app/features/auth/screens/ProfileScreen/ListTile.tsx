import React from "react"
import { EduBody, } from "../../../../components"
import { Box, Button, IButtonProps, Icon, Row } from "native-base"

interface ListTileProps extends IButtonProps {
  leftIcon?: JSX.Element,
  rightIcon?: JSX.Element,
  text: string,
  color?: string
  onPress?: () => void,
}

export function ListTile(props: ListTileProps) {
  const {
    leftIcon,
    rightIcon,
    text,
    onPress,
    color = "greyscale.900",
  } = props

  return (
    <Button
      // minHeight="20"
      // padding="4"
      paddingLeft="6"
      paddingRight="6"
      // height="20"
      colorScheme="blue"
      variant="ghost"
      borderRadius="none"
      onPress={onPress}
    // backgroundColor="amber.300"
    >
      <Row
        width="full"
        // backgroundColor="amber.300"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {leftIcon ? <Icon color={color} as={leftIcon} /> : <Box />}
        <Box width="6" />
        <Box flex={1}>
          <EduBody
            sizeT="xl"
            color={color}
            fontWeight="semibold"
            text={text}
            numberOfLines={1}
          />
        </Box>
        {rightIcon ? <Icon color={color} as={rightIcon} /> : <Box />}
      </Row>
    </Button>
  )
}

