import React from "react"
import { EduBody, IconSVG, } from "../../../../components"
import { Button, ButtonProps, XStack } from "tamagui"

type ListTileProps = ButtonProps & {
  leftIcon?: JSX.Element,
  rightIcon?: JSX.Element,
  text: string,
  color?: string
}

export function ListTile(props: ListTileProps) {
  const {
    leftIcon,
    rightIcon,
    text,
    color = "$color",
    ...rest
  } = props

  return (
    <Button br="$none" paddingHorizontal="$6" {...rest}>
      <XStack w="$full" jc="space-evenly" ai="center" space="$6" >
        {leftIcon && <IconSVG color={color} as={leftIcon} />}
        <EduBody
          flex={1}
          sizeT="xl"
          color={color}
          fontWeight="semibold"
          text={text}
          numberOfLines={1}
        />
        {rightIcon && <IconSVG color={color} as={rightIcon} />}
      </XStack>
    </Button>
  )
}

