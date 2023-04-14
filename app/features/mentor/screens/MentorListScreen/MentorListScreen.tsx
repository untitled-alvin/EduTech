import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo, useState } from "react"
import {
  EduActivityIndicator,
  EmptyState,
  Screen,
  RefreshControl
} from "../../../../components"
import { isRTL } from "../../../../i18n"
import { useStores } from "../../../../models"
import { Mentor } from "../../models/Mentor"
import { AppStackScreenProps } from "../../../../navigators"
import { MentorListTile } from "../../components"
import { useBackHeader } from "../../../../utils/useBackHeader"
import { YStack } from "tamagui"
import { delay } from "../../../../utils/delay"
import { FlashList } from "@shopify/flash-list"

interface MentorListScreenProps extends AppStackScreenProps<"MentorList"> { }

export const MentorListScreen = observer(function MentorsListScreen(props: MentorListScreenProps) {
  const { navigation } = props
  const { mentorStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useBackHeader({ titleTx: "topMentorsScreen.topMentors" })

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    (async function load() {
      setIsLoading(true)
      await mentorStore.fetchMentors()
      setIsLoading(false)
    })()
  }, [mentorStore])

  const ListEmptyComponent = useMemo(() => () => {
    return isLoading ? (
      <EduActivityIndicator />
    ) : (
      <EmptyState
        preset="generic"
        style={{ marginTop: 48 }}
        buttonOnPress={manualRefresh}
        imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
        ImageProps={{ resizeMode: "contain" }}
      />
    )
  }, [isLoading])

  // simulate a longer refresh, if the refresh is too fast for UX
  const manualRefresh = async () => {
    setRefreshing(true)
    // await Promise.all([mentorStore.fetchMentors()])
    await Promise.all([delay(2000)])
    setRefreshing(false)
  }

  const loadMore = async () => {
    setIsLoading(true)
    await Promise.all([delay(2000)])
    setIsLoading(false)
  }

  const renderItem = ({ item: $mentor }) => (
    <MentorListTile
      mentor={$mentor}
      onPress={() => navigation.push("MentorProfile")}
    />
  )

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right"]}>
      <YStack w="$full" h="$full">
        <FlashList<Mentor>
          data={mentorStore.mentors}
          extraData={mentorStore.mentors}
          keyExtractor={(item) => item.guid}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={manualRefresh} />}
          renderItem={renderItem}
          estimatedItemSize={200}
          onEndReached={loadMore}
          ListEmptyComponent={<ListEmptyComponent />}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      </YStack>
    </Screen>
  )
})
