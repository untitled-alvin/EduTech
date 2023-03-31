import React, { ReactElement } from "react"
import { EduBody, EduBodyProps } from "./Typography/EduBody";
import { EduHeading } from "./Typography/EduHeading";
import { ButtonProps, Button, XStack, YStack } from "tamagui";

export type EduListTileProps = ButtonProps & {
  /**
   * The text to display if not using `tx` or nested components.
   */
  title?: EduBodyProps
  /**
   * The text to display if not using `tx` or nested components.
   */
  subtitle?: EduBodyProps
  /**
   * Right action custom ReactElement.
   * Overrides `leftIcon`.
   */
  Leading?: ReactElement
  /**
   * Right action custom ReactElement.
   * Overrides rightIcon`.
   */
  Trailing?: ReactElement
}

export const EduListTile = ({ title, subtitle, Leading, Trailing, ...rest }: EduListTileProps) => {
  return (
    <Button theme="list_tile" h="$20" paddingVertical="$2" paddingHorizontal="$6" {...rest}>
      <XStack w="$full" jc="space-evenly" ai="center" space="$4">
        {Leading && Leading}
        <YStack flex={1} space="$1" >
          {title && <EduHeading preset="h6" numberOfLines={2} {...title} />}
          {subtitle && <EduBody numberOfLines={1} color={"$greyscale700"} {...subtitle} />}
        </YStack>
        {Trailing && Trailing}
      </XStack>
    </Button>
  )
}
// return <ListItem
//   paddingVertical="$4"
//   paddingHorizontal="$6"
//   pressStyle={{ bc: "$primary200" }}
//   onPress={() => { }}
//   title={`${mentor.author}`}
//   subTitle={`${mentor.author}`}
// />