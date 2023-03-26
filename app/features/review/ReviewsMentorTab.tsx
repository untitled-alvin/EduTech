import React from "react"
import { RefreshControl } from "react-native"
import { ReviewList } from "./ReviewList"
import { useRefresh } from "../source/useRefresh"
import { HScrollView } from "react-native-head-tab-view"
import { YStack } from "tamagui"

interface ReviewsMentorTabProps {
  index: number
}

export function ReviewsMentorTab(props: ReviewsMentorTabProps) {
  const [refreshing, startRefreshing] = useRefresh()

  return (
    <HScrollView index={props.index} showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={startRefreshing} />}
    >
      <YStack>
        <YStack h="$2" />
        <ReviewList />
        <YStack h="$6" />
      </YStack>
    </ HScrollView>
  )
}
