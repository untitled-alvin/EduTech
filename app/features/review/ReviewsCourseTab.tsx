import React from "react"
import { Heading, IconSVG, Star } from "../../components"
import { RefreshControl } from "react-native"
import { RateSelector } from "./RateSelector"
import { ReviewList } from "./ReviewList"
import { useRefresh } from "../course/useRefresh"
import { HScrollView } from "react-native-head-tab-view"
import { XStack, YStack } from "tamagui"

type ReviewsCourseTabProps = { index: number }

export function ReviewsCourseTab(props: ReviewsCourseTabProps) {
  const [isRefreshing, startRefreshing] = useRefresh()

  return (
    <HScrollView index={props.index}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={startRefreshing} />}
      showsVerticalScrollIndicator={false}>
      <YStack>
        <YStack h="$4" />
        <XStack marginHorizontal="$6" space="$2">
          <IconSVG color="#FB9400" as={<Star set="bulk" />} />
          <Heading preset="h5" numberOfLines={1} text="4.8 (4,479 reviews)" />
        </XStack>

        <YStack h="$4" />
        <RateSelector onChanged={(key) => { }} />

        <YStack h="$4" />
        <ReviewList />

        <YStack h="$6" />
      </YStack>
    </ HScrollView>
  )
}
