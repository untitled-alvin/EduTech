import React, { useMemo } from "react"
import { AccessibilityProps, Platform, } from "react-native"
import { Avatar, Button, ButtonProps, YStack } from "tamagui"
import { Body, rnrImages } from "../../../components"
import { Mentor } from "../models/Mentor"

export type MentorCardProps = ButtonProps & { mentor: Mentor }

export const MentorCard = function MentorCard(props: MentorCardProps) {
  const { mentor: { name, author }, ...rest } = props
  const imageUri = useMemo(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  return (
    <Button p="$none" w="$20" h="$32" pressStyle={{ opacity: 0.8 }}
      {...Platform.select<AccessibilityProps>({
        android: { accessibilityLabel: name },
        ios: { accessibilityLabel: name, accessibilityHint: name },
      })}
      {...rest}
    >
      <YStack jc="space-evenly" ai="center" space="$2" >
        <Avatar size="$18"><Avatar.Image src={imageUri} /></Avatar>
        {/* <Avatar size="lg" source={imageUri} /> */}
        <Body
          size="large"
          weight="semibold"
          marginHorizontal="$1"
          numberOfLines={2}
          textAlign="center"
          text={`${author}`}
        />
      </YStack>
    </Button>
  )
}
