import React from "react"
import { Select, SelectTriggerProps } from "tamagui"
import { LinearGradient } from 'tamagui/linear-gradient'
import {
  YStack, styled,
  Adapt,
  Sheet,
  SelectProps,
} from "tamagui"
import { EduSelectTrigger } from "./EduSelectTrigger"
import { ChevronDown, ChevronUp } from "../../Iconly"
import { IconSVG } from "../icon/SVGIcon"
import { Body } from "../typography"

export type EduSelectProps = SelectProps & {
  error?: boolean
}

export const EduSelect = (props: EduSelectProps) => {
  const { error = false, ...rest } = props
  const filled = props.value || props.defaultValue
  const status = error ? "error" : filled ? "filled" : "empty"

  return (
    <Select {...rest} >
      <EduSelectTrigger status={status}>
        {filled ?
          <Body text={props.value || props.defaultValue} textTransform={"capitalize"} /> :
          <Body tx="common.gender" />
        }
        {/* <Select.Value
          fontWeight={"900"}
          fontSize={33}
          color="white"
          placeholder={translate("common.gender")}
        /> */}
        {/* <SelectValue1 placeholder={translate("common.gender")} /> */}
      </EduSelectTrigger>

      <Adapt platform="touch">
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton ai="center" jc="center" pos="relative" w="100%" h="$3">
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
      </Select.Content>
    </Select>
  )
}