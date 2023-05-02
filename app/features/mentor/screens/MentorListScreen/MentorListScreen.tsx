import React, { useCallback, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { YStack } from "tamagui"
import { FlashList } from "@shopify/flash-list"
import {
  ActivityIndicator,
  EmptyState,
  Screen,
  RefreshControl
} from "../../../../components"
import { useStores } from "../../../../models"
import { AppStackScreenProps } from "../../../../navigators"
import { MentorListTile } from "../../components"
import { useBackHeader } from "../../../../utils/useBackHeader"
import { Mentor } from "../../../../services/edu-api"

interface MentorListScreenProps extends AppStackScreenProps<"MentorList"> { }

export const MentorListScreen = observer((props: MentorListScreenProps) => {
  const { navigation } = props
  const { mentorStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadmore, setIsLoadmore] = useState(false)

  useBackHeader({ titleTx: "mentor.topMentors" })

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    initialLoad()
  }, [])

  const renderItem = useCallback(({ item: $mentor }) => (
    <MentorListTile mentor={$mentor}
      onPress={() => navigation.push("MentorProfile", $mentor)} />
  ), [])

  const ListEmptyComponent = useMemo(() => () => (
    isLoading ? <ActivityIndicator /> : <EmptyState buttonOnPress={initialLoad} />
  ), [isLoading])

  const ListFooterComponent = useMemo(() => () => (
    <ActivityIndicator opacity={isLoadmore ? 1 : 0} />
  ), [isLoadmore])

  // simulate a longer refresh, if the refresh is too fast for UX
  const initialLoad = async () => {
    setIsLoading(true)
    // await mentorStore.fetchMentors()
    await mentorStore.refresh()
    setIsLoading(false)
  }

  const manualRefresh = async () => {
    setRefreshing(true)
    await mentorStore.refresh()
    setRefreshing(false)
  }

  const loadMore = async () => {
    if (!refreshing && !isLoading && !isLoadmore && mentorStore.hasNextPage) {
      setIsLoadmore(true)
      await mentorStore.loadmore()
      setIsLoadmore(false)
    }
  }

  const mentors = [...mentorStore.mentors]

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right"]}>
      <YStack w="$full" h="$full">
        <FlashList<Mentor>
          data={mentors}
          renderItem={renderItem}
          estimatedItemSize={200}
          onEndReached={loadMore}
          ListEmptyComponent={<ListEmptyComponent />}
          ListFooterComponent={<ListFooterComponent />}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={manualRefresh} />}
        />
      </YStack>
    </Screen>
  )
})
