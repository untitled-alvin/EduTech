import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  ViewStyle,
} from "react-native"
import { EduBody, spacing } from "../../../components"
import { Mentor } from "../models/Mentor"
import { navigate } from "../../../navigators"
import { useStores } from "../../../models"
import { MentorCard } from "./MentorCard"
import { YStack } from "tamagui"

interface MentorsPreviewProps { }

export const MentorsPreview = observer(function MentorsListScreen(props: MentorsPreviewProps) {
  const { mentorStore } = useStores()
  const [isLoading, setIsLoading] = useState(false)

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
      <EduBody tx="emptyStateComponent.generic.heading" />
    )
  }, [isLoading])

  const renderItem = ({ index, item }) => (
    <MentorCard onPress={() => navigate("MentorProfile")}
      key={item.guid} mentor={item}
    />
  )

  return (
    <FlatList<Mentor>
      data={mentorStore.mentors}
      extraData={mentorStore.mentors.length}
      ItemSeparatorComponent={() => <YStack w="$2" />}
      contentContainerStyle={$contentContainerStyle}
      horizontal
      ListEmptyComponent={<ListEmptyComponent />}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  )
})

const $contentContainerStyle: ViewStyle = { paddingHorizontal: spacing.large }

