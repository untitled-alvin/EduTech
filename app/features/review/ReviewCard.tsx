import MaskedView from "@react-native-community/masked-view"
import React from "react"
import { AccessibilityProps, Platform } from "react-native"
import { Avatar, Button, XStack, YStack } from "tamagui"
import { LinearGradient } from "tamagui/linear-gradient"
import {
  AssetsImage,
  Chip, EduBody, EduHeading, Heart2,
  IconButton,
  IconSVG,
  MoreCircle, Star
} from "../../components"

interface ReviewCardProps {
  duration?: string,
  liked?: boolean
  likedCount?: number
  rate?: number
  username?: string,
  comment?: string,
}

export function ReviewCard(props: ReviewCardProps) {
  const {
    duration = "2 weeks ago",
    liked = false,
    likedCount = 948,
    rate = 4,
    username = "Tanner Stafford",
    comment = `The quality of the courses and mentors is very good and the explanations are very easy to understand. 💯💯💯`
  } = props;

  return (
    <Button h="$42" br="$none" p="$6" disabled
      {...Platform.select<AccessibilityProps>({
        ios: { accessibilityLabel: username },
        android: { accessibilityLabel: username },
      })}
    >
      <YStack flex={1} jc="flex-start"  >
        <XStack w="$full" jc="space-evenly" ai="center" >
          <Avatar size="$12"><AssetsImage image="user" style={{ flex: 1 }} /></Avatar>

          <YStack w="$4" />
          <EduHeading flex={1} preset="h6" numberOfLines={1} text={`${username}`} />

          <YStack w="$2" />
          <Chip
            disabled
            type="outline"
            text={`${rate}`}
            leftIcon={<Star set="bold" />}
            sizeT="small"
          />

          <YStack w="$2" />
          <IconSVG as={<MoreCircle set="light" />} />
        </XStack>

        <YStack h="$3" />
        <EduBody type="regular" numberOfLines={3} text={comment} />

        <YStack h="$3" />
        <XStack w="$full" jc="flex-start" ai="center" >
          <IconButton
            size="$8"
            icon={liked ? <Heart2Gradient /> : <IconSVG as={<Heart2 set="light" />} />}
          />


          <YStack w="$2" />
          <EduBody sizeT="small" type="semibold" text={`${likedCount}`} numberOfLines={1} />

          <YStack w="$6" />
          <EduBody
            sizeT="small"
            type="semibold"
            text={duration}
            numberOfLines={1}
            color="$greyscale700"
          />
        </XStack>
      </YStack>
    </Button>
  )
}

export function Heart2Gradient({ ...rest }) {
  return (
    <YStack flex={1} {...rest}>
      <MaskedView style={{ flex: 1 }} maskElement={<Heart2 set="bold" size="large" />}>
        <LinearGradient
          flex={1}
          colors={['#FF4D67', '#FF8A9B']}
          end={[0, 0]}
          start={[0, 1]}
        />
      </MaskedView>
    </YStack>
  )
}
