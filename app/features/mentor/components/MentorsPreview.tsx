import React, { useCallback, useEffect, useMemo, useState } from "react"
import { FlatList, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { YStack } from "tamagui"
import { MentorCard } from "./MentorCard"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ActivityIndicator, Body, spacing } from "../../../components"
import { Mentor } from "../../../services/edu-api"

interface MentorsPreviewProps { }

export const MentorsPreview = observer((_props: MentorsPreviewProps) => {
  const { mentorStore } = useStores()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async function load() {
      setIsLoading(true)
      await mentorStore.refresh()
      setIsLoading(false)
    })()
  }, [mentorStore])

  const renderItem = useCallback(({ item }) => (
    <MentorCard mentor={item} onPress={() => navigate("MentorProfile", item)} />
  ), [])

  const ListEmptyComponent = useMemo(() => () => (
    isLoading ? <ActivityIndicator /> : <Body tx="emptyStateComponent.generic.heading" />
  ), [isLoading])

  return (
    <FlatList<Mentor> horizontal
      data={mentorStore.mentors}
      extraData={mentorStore.mentors.length}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <YStack w="$2" />}
      contentContainerStyle={$contentContainerStyle}
      ListEmptyComponent={<ListEmptyComponent />}
      showsHorizontalScrollIndicator={false}
    />
  )
})

const $contentContainerStyle: ViewStyle = { paddingHorizontal: spacing.large }

