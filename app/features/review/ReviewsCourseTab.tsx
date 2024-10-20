import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { XStack, YStack } from "tamagui"
import { HScrollView } from "react-native-head-tab-view"
import { RateSelector } from "./RateSelector"
import { useStores } from "../../models"
import { ActivityIndicator, EmptyState, Heading, IconSVG, Star } from "../../components"
import { ReviewCard } from "./ReviewCard"
import { Review } from "../../services/student-api"
import { translate } from "../../i18n"

export const ReviewsCourseTab = observer((props: { index: number }) => {
  const { courseDetailStore } = useStores()
  const { reviews, reviewNumber, reviewsAveragePoint } = courseDetailStore
  const [isLoading, setIsLoading] = useState(false)
  const average = Math.round(reviewsAveragePoint * 100) / 100
  const header = `${average} (${reviewNumber} ${translate("common.reviews")})`

  const onRateChanged = (value?: string) => {
    courseDetailStore.reviewStore.setProp("rate", value ? +value : null)
    load()
  }

  const load = async () => {
    setIsLoading(true)
    await courseDetailStore.fetchReviews()
    setIsLoading(false)
  }

  return (
    <HScrollView index={props.index} showsVerticalScrollIndicator={false}>
      <YStack>
        <YStack h="$4" />
        <XStack marginHorizontal="$6" space="$2">
          <IconSVG color="#FB9400" as={<Star set="bulk" />} />
          <Heading preset="h5" numberOfLines={1} text={header} />
        </XStack>

        <YStack h="$4" />
        <RateSelector onChanged={onRateChanged} />
        <YStack h="$4" />

        {isLoading ? <ActivityIndicator /> : <Reviews reviews={reviews} />}

        <YStack h="$6" />
      </YStack>
    </ HScrollView>
  )
})


const Reviews = ({ reviews }: { reviews?: Review[] }) => {
  const renderItem = (item: Review) => (
    <ReviewCard
      key={item.uid}
      rate={item.rate}
      userid={`${item.user_index}`}
      duration="2 weeks ago"
      username="Jonathan Williams"
      comment={item.content}
    />
  )

  return (
    <YStack>
      {reviews?.length ? reviews?.map(renderItem) : <EmptyState preset="normal" />}
    </YStack>
  )
}
