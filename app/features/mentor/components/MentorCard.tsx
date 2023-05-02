import React, { useMemo } from "react"
import { AccessibilityProps, Platform, } from "react-native"
import { Avatar, Button, ButtonProps, YStack, styled } from "tamagui"
import { Body, mentorImages } from "../../../components"
import { Mentor } from "../../../services/edu-api"

type MentorCardProps = ButtonProps & { mentor: Mentor }

const CardFrame = styled(Button, {
  w: "$20", h: "$32", padding: "$none",
  pressStyle: { opacity: 0.8, bg: "$transparent" }
})

export const MentorCard = ({ mentor, ...rest }: MentorCardProps) => {
  const { nickname = "" } = mentor
  const imageUri = useMemo(() => {
    return mentorImages[Math.floor(Math.random() * mentorImages.length)]
  }, [])
  const accessibility = Platform.select<AccessibilityProps>({
    android: { accessibilityLabel: nickname },
    ios: { accessibilityLabel: nickname, accessibilityHint: nickname },
  })

  return (
    <CardFrame {...accessibility} {...rest}>
      <YStack jc="space-evenly" ai="center" space="$2" >
        <Avatar size="$18"><Avatar.Image src={imageUri} /></Avatar>
        <Body
          size="large"
          weight="semibold"
          marginHorizontal="$1"
          numberOfLines={2}
          textAlign="center"
          text={nickname}
        />
      </YStack>
    </CardFrame>
  )
}
