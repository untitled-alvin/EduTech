import React from "react"
import {
  EduHeading,
  Star,
} from "../../components"
import { Box, Icon, Row } from "native-base"
import { RefreshControl } from "react-native"
import { RateSelector } from "./RateSelector"
import { ReviewList } from "./ReviewList"
import { useRefresh } from "../source/useRefresh"
import { ScrollView } from "react-native-collapsible-tab-view"

interface ReviewsSourceTabProps { }

export function ReviewsSourceTab(props: ReviewsSourceTabProps) {
  const [isRefreshing, startRefreshing] = useRefresh()

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      accessibilityTraits={undefined}
      refreshControl={<RefreshControl refreshing={isRefreshing}
        onRefresh={startRefreshing} />}
      accessibilityComponentType={undefined}
    >
      <Box>
        <Box height={4} />
        <Row marginLeft={6} marginRight={6}  >
          <Icon
            alignSelf="center"
            color="#FB9400"
            marginRight={2}
            as={<Star set="bulk" />}
          />
          <EduHeading preset="h5" numberOfLines={1} text="4.8 (4,479 reviews)" />
        </Row>

        <Box height={6} />
        <RateSelector onChanged={(key) => { }} />

        <ReviewList />
        <Box height={6} />
      </Box>
    </ ScrollView>
  )
}
