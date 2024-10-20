import React, { useState } from "react"
import { AccessibilityProps, Platform, View } from "react-native"
import { Avatar, Button, XStack, YStack } from "tamagui"
import { LinearGradient } from "tamagui/linear-gradient"
import MaskedView from '@react-native-masked-view/masked-view';
import {
  AssetsImage,
  Chip, Body, Heading, Heart2,
  IconButton,
  IconSVG,
  MoreCircle, Star
} from "../../components"
import { UserBuilder } from "../user";

type ReviewCardProps = {
  duration?: string,
  liked?: boolean
  likeNumber?: number
  rate?: number
  username?: string,
  comment?: string,
  userid?: string,

}

export const ReviewCard = (props: ReviewCardProps) => {
  const {
    duration = "2 weeks ago",
    liked = false,
    likeNumber = 948,
    rate = 4,
    username = "Tanner Stafford",
    comment = `N/A`
  } = props;

  return (
    <Button h="$42" br="$none" p="$6" disabled
      {...Platform.select<AccessibilityProps>({
        ios: { accessibilityLabel: username },
        android: { accessibilityLabel: username },
      })}
    >
      <YStack flex={1} jc="flex-start">

        <XStack w="$full" jc="space-evenly" ai="center">

          <Avatar size="$12"><AssetsImage image="user" style={{ flex: 1 }} /></Avatar>

          <YStack w="$4" />
          <UserBuilder uid={props.userid}
            render={(user) => {
              return (
                <Heading flex={1} preset="h6" numberOfLines={1}
                  text={`${user?.nickname ?? 'N/A'}`} />
              )
            }}
          />

          {/* <Heading flex={1} preset="h6" numberOfLines={1} text={`${username}`} /> */}

          <YStack w="$2" />
          <Chip disabled preset="outline" text={`${rate}`} leftIcon={<Star set="bold" />} size="small" />

          <YStack w="$2" />
          <IconSVG as={<MoreCircle set="light" />} />
        </XStack>

        <YStack h="$3" />
        <Body weight="regular" numberOfLines={3} text={comment} />

        <YStack h="$3" />
        <XStack w="$full" jc="flex-start" ai="center">
          <IconButton size="$8"><IconSVG as={<Heart2 set="light" />} /></IconButton>
          <IconButton size="$8" icon={<Heart2Gradient />} />
          {/* <IconButton
            size="$8"
            icon={liked ? <Heart2Gradient /> : <IconSVG as={<Heart2 set="light" />} />}
          /> */}

          <YStack w="$2" />
          <Body size="small" weight="semibold" text={`${likeNumber}`} numberOfLines={1} />

          <YStack w="$6" />
          <Body
            size="small"
            weight="semibold"
            text={duration}
            numberOfLines={1}
            color="$greyscale700"
          />
        </XStack>
      </YStack>
    </Button>
  )
}

export const Heart2Gradient = ({ ...rest }) => {
  return (
    <IconSVG
      as={
        <MaskedView style={{ flex: 1 }} maskElement={<Heart2 set="bold" />}>
          <LinearGradient
            flex={1}
            colors={['#FF4D67', '#FF8A9B']}
            end={[0, 0]}
            start={[0, 1]}
          />
        </MaskedView>
      }
    />
  )
}