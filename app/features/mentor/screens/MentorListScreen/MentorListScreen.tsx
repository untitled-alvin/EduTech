import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo } from "react"
import { ActivityIndicator, FlatList } from "react-native"
import { EmptyState, Screen } from "../../../../components"
import { isRTL } from "../../../../i18n"
import { useStores } from "../../../../models"
import { Mentor } from "../../models/Mentor"
import { AppStackScreenProps } from "../../../../navigators"
import { MentorListTile } from "../../components"
import { useBackHeader } from "../../../../utils/useBackHeader"

interface MentorListScreenProps extends AppStackScreenProps<"MentorList"> { }

export const MentorListScreen = observer(function MentorsListScreen(props: MentorListScreenProps) {
  const { navigation } = props
  const { mentorStore } = useStores()
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  useBackHeader({ titleTx: "topMentorsScreen.topMentors" })

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    (async function load() {
      setIsLoading(true)
      await mentorStore.fetchMentors()
      setIsLoading(false)
    })()
  }, [mentorStore])

  const ListEmptyComponent = useMemo(() => function ListEmptyComponent() {
    return isLoading ? (
      <ActivityIndicator />
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
    await Promise.all([mentorStore.fetchMentors()])
    setRefreshing(false)
  }

  const renderItem = ({ item: $mentor, index }) => (
    <MentorListTile
      key={$mentor.guid}
      mentor={$mentor}
      onPress={() => navigation.push("MentorProfile")}
    />
  )

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right"]}>
      <FlatList<Mentor>
        data={mentorStore.mentors}
        extraData={mentorStore.mentors}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        renderItem={renderItem}
        ListEmptyComponent={<ListEmptyComponent />}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  )
})
