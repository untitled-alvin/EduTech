import React, { useMemo } from "react"
import { AccessibilityProps, Platform, } from "react-native"
import { Avatar, Button, ButtonProps, YStack } from "tamagui"
import { EduBody, rnrImages } from "../../../components"
import { Mentor } from "../models/Mentor"

export type MentorCardProps = ButtonProps & { mentor: Mentor }

export const MentorCard = function MentorCard(props: MentorCardProps) {
  const { mentor, ...rest } = props
  const imageUri = useMemo(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  return (
    <Button p="$none" w="$20" h="$32"
      pressStyle={{ opacity: 0.7 }}
      {...Platform.select<AccessibilityProps>({
        android: { accessibilityLabel: mentor.name },
        ios: {
          accessibilityLabel: mentor.name,
          accessibilityHint: mentor.name
        },
      })}
      {...rest}
    >
      <YStack jc="space-evenly" ai="center" space="$2" >
        <Avatar size="$18">
          <Avatar.Image src={imageUri} />
        </Avatar>
        {/* <Avatar size="lg" source={imageUri} /> */}
        <EduBody
          sizeT="large"
          type="semibold"
          marginHorizontal="$1"
          numberOfLines={2}
          textAlign="center"
          text={`${mentor.author}`}
        // color={"$greyscale900"}
        />
      </YStack>
    </Button>
  )
}
