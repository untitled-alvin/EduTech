import React from "react"
import { EduBody, IconSVG, } from "../../../../components"
import { Button, ButtonProps, XStack, YStack } from "tamagui"

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
    color = "$greyscale900",
    ...rest
  } = props

  return (
    <Button bc="white" br="$none" paddingHorizontal="$6"
      pressStyle={{ backgroundColor: "$primary200" }} {...rest}>
      <XStack w="$full" jc="space-evenly" ai="center" space="$6" >
        {leftIcon && <IconSVG color={color} as={leftIcon} />}
        <YStack flex={1}>
          <EduBody
            sizeT="xl"
            color={color}
            fontWeight="semibold"
            text={text}
            numberOfLines={1}
          />
        </YStack>
        {rightIcon && <IconSVG color={color} as={rightIcon} />}
      </XStack>
    </Button>
  )
}

