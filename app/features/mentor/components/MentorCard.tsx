import { Box, Button, Column, Avatar, IButtonProps } from "native-base"
import React, { useMemo } from "react"
import { AccessibilityProps, Platform, } from "react-native"
import { EduBody, rnrImages } from "../../../components"
import { Mentor } from "../models/Mentor"

interface MentorCardProps extends IButtonProps {
  mentor: Mentor
}

export const MentorCard = function MentorCard(props: MentorCardProps) {
  const { mentor, ...rest } = props
  const imageUri = useMemo(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  return (
    <Button
      padding="0"
      // padding="4"
      height="32"
      width="20"
      maxHeight="32"
      minHeight="20"
      backgroundColor="white"
      // colorScheme="blue"
      variant="ghost"
      borderRadius="none"
      // borderRadius="full"
      {...Platform.select<AccessibilityProps>({
        android: { accessibilityLabel: mentor.name },
        ios: {
          accessibilityLabel: mentor.name,
          accessibilityHint: mentor.name
        },
      })}
      {...rest}
    >
      <Column justifyContent="space-evenly" alignItems="center" >
        <Avatar size="lg" source={imageUri} />
        <Box height="2" />
        <EduBody
          sizeT="large"
          type="semibold"
          paddingRight="1"
          paddingLeft="1"
          numberOfLines={2}
          textAlign="center"
          text={`${mentor.author}`}
          color={"greyscale.900"}
        />
      </Column>
    </Button>
  )
}
