import React from "react"
import { Body, IconSVG, } from "../../../../components"
import { Button, GetProps, Theme, XStack, styled } from "tamagui"

const SettingItemFrame = styled(Button, {
  br: "$none",
  paddingHorizontal: "$6",
  pressStyle: { opacity: 0.8 },
})

type SettingItemProps = GetProps<typeof SettingItemFrame> & {
  text: string
  color?: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
}

export const SettingItem = (props: SettingItemProps) => {
  const {
    leftIcon,
    rightIcon,
    text,
    color = "$color",
    ...rest
  } = props

  return (
    <Theme name="ListTile" >
      <SettingItemFrame bg="$transparent" {...rest}>
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
      </SettingItemFrame>
    </Theme>
  )
}

