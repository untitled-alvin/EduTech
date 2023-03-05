import React from "react"
import { Box } from "native-base"
import { RefreshControl } from "react-native"
import { ReviewList } from "./ReviewList"
import { useRefresh } from "../source/useRefresh"
import { HScrollView } from "react-native-head-tab-view"

interface ReviewsMentorTabProps {
  index: number
}

export function ReviewsMentorTab(props: ReviewsMentorTabProps) {
  const [isRefreshing, startRefreshing] = useRefresh()

  return (
    <HScrollView
      index={props.index}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={isRefreshing}
        onRefresh={startRefreshing} />}
    >
      <Box>
        <Box height={2} />
        <ReviewList />
        <Box height={6} />
      </Box>
    </ HScrollView>
  )
}
