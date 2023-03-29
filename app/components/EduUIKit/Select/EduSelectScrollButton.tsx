import React from "react"
import { Select, SelectItemProps } from "tamagui"
import { LinearGradient } from 'tamagui/linear-gradient'
import { ChevronDown, ChevronUp } from "../../Iconly"
import { YStack, SelectScrollButtonProps } from "tamagui"
import { IconSVG } from "../SVGIcon"


export const EduSelectScrollUpButton = (props: SelectScrollButtonProps) => {
  return (
    <Select.ScrollUpButton ai="center" jc="center" pos="relative" w="100%" h="$3" {...props}>
      <YStack zi={10}>
        <ChevronUp />
      </YStack>
      <LinearGradient
        start={[0, 0]}
        end={[0, 1]}
        fullscreen
        colors={['$background', '$backgroundTransparent']}
        br="$4"
      />
    </Select.ScrollUpButton>
  )
}

export const EduSelectScrollDownButton = (props: SelectScrollButtonProps) => {
  return (
    <Select.ScrollDownButton ai="center" jc="center" pos="relative" w="100%" h="$3">
      <YStack zi={10}>
        <IconSVG as={<ChevronDown set="bold" />} color="$greyscale900" />
      </YStack>
      <LinearGradient
        start={[0, 0]}
        end={[0, 1]}
        fullscreen
        colors={['$backgroundTransparent', '$background']}
        br="$4"
      />
    </Select.ScrollDownButton>
  )
}

type EduSelectItemProps = SelectItemProps & { name: string }

export const EduSelectItem = ({ value, name, ...rest }: EduSelectItemProps) => {
  return (
    <Select.Item value={value} {...rest}>
      <Select.ItemText color="$color">{name}</Select.ItemText>
      <Select.ItemIndicator ml="auto">
        <IconSVG as={<ChevronDown set="bold" />} color="$primary500" />
      </Select.ItemIndicator>
    </Select.Item>
  )
}
