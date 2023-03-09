import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useEffect } from "react"
import {
  ActivityIndicator,
  FlatList,
} from "react-native"
import { EmptyState, Screen } from "../../../../components"
import { isRTL } from "../../../../i18n"
import { useStores } from "../../../../models"
import { Mentor } from "../../models/Mentor"
import { AppStackScreenProps } from "../../../../navigators"
import { delay } from "../../../../utils/delay"
import { useHeader } from "../../../../utils/useHeader"
import { MentorListTile } from "../../components"

interface MentorListScreenProps extends AppStackScreenProps<"MentorList"> { }

export const MentorListScreen: FC<MentorListScreenProps> = observer(function MentorsListScreen(_props) {
  const { navigation } = _props
  const { mentorStore } = useStores()
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const renderItem = useCallback(({ item, index }) => {
    const mentor = mentorStore.mentors[index]

    return <MentorListTile key={mentor.guid}
      mentor={mentor}
      onPress={() => navigation.push("MentorProfile")}
    />
  }, [])

  useHeader({
    leftIcon: "arrowLeft",
    onLeftPress: () => navigation.goBack(),
    titleTx: "topMentorsScreen.topMentors"
  })

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    (async function load() {
      setIsLoading(true)
      await mentorStore.fetchMentors()
      setIsLoading(false)
    })()
  }, [mentorStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([mentorStore.fetchMentors(), delay(750)])
    setRefreshing(false)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right"]}>
      <FlatList<Mentor>
        data={mentorStore.mentors}
        extraData={mentorStore.mentors}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        renderItem={renderItem}
        ListEmptyComponent={
          isLoading ? (
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
        }
      />
    </Screen>
  )
})
