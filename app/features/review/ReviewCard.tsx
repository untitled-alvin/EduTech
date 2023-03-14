import React from "react"
import {
  Chip, EduBody, EduHeading, Heart2,
  kUserIMG, MoreCircle, Star
} from "../../components"
import { Avatar, Box, Button, Column, Icon, Row } from "native-base"
import { AccessibilityProps, Platform } from "react-native"

interface ReviewCardProps {
  // mentor?: Mentor,
  duration?: string,
  liked?: boolean
  likedCount?: number
  rate?: number
  username?: string,
  comment?: string,
}

export function ReviewCard(props: ReviewCardProps) {
  const {
    // mentor,
    duration = "2 weeks ago",
    liked = false,
    likedCount = 948,
    rate = 4,
    username = "Tanner Stafford",
    comment = `The quality of the courses and mentors is very good and the explanations are very easy to understand. 💯💯💯`
  } = props;

  return (
    <Button
      padding="6"
      disabled
      height="40"
      colorScheme="blue"
      variant="ghost"
      borderRadius="none"
      {...Platform.select<AccessibilityProps>({
        ios: { accessibilityLabel: username },
        android: { accessibilityLabel: username },
      })}
    >
      <Column flex={1} justifyContent="flex-start"  >
        <Row width="full" justifyContent="space-evenly" alignItems="center" >
          <Avatar size="md" source={kUserIMG} />

          <Box width="4" />
          <EduHeading
            flex={1}
            preset="h6"
            numberOfLines={1}
            text={`${username}`}
            color="greyscale.900"
          />

          <Box width="2" />
          <Chip
            disabled
            type="outline"
            text={`${rate}`}
            leftIcon={<Star set="bold" size="xxs" />}
            sizeT="small"
          />

          <Box width="2" />
          <Icon color="greyscale.900" as={<MoreCircle set="light" />} />
        </Row>

        <Box height="3" />
        <EduBody type="regular" numberOfLines={3} text={comment} />

        <Box height="3" />
        <Row width="full" justifyContent="flex-start" alignItems="center" >
          <Icon
            color="greyscale.900"
            as={liked ? <Heart2 set="bold" /> : <Heart2 set="light" />}
          />

          <Box width="2" />
          <EduBody
            sizeT="small"
            type="semibold"
            text={`${likedCount}`}
            numberOfLines={1}
            color="greyscale.900"
          />

          <Box width="6" />
          <EduBody
            sizeT="small"
            type="semibold"
            text={duration}
            numberOfLines={1}
            color="greyscale.700"
          />
        </Row>
      </Column>
    </Button>
  )
}
