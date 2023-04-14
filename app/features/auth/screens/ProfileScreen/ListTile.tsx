import React from "react"
import { Body, IconSVG, } from "../../../../components"
import { Button, ButtonProps, XStack, styled } from "tamagui"

const ListTileFrame = styled(Button, {
  componentName: "ListTile",
  br: "$none",
  paddingHorizontal: "$6",
  pressStyle: { opacity: 0.8 },
})

type ListTileProps = ButtonProps & {
  text: string
  color?: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
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
    <ListTileFrame {...rest}>
      <XStack w="$full" jc="space-evenly" ai="center" space="$6" >
        {leftIcon && <IconSVG color={color} as={leftIcon} />}
        <Body
          flex={1}
          size="xl"
          color={color}
          weight="semibold"
          text={text}
          numberOfLines={1}
        />
        {rightIcon && <IconSVG color={color} as={rightIcon} />}
      </XStack>
    </ListTileFrame>
  )
}

