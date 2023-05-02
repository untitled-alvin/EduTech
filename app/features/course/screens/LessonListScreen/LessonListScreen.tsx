import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useState } from "react"
import {
  BottomNavigator,
  EmptyState,
  Screen,
  Button,
  EduShadow,
  ActivityIndicator,
  RefreshControl
} from "../../../../components"
import { translate } from "../../../../i18n"
import { AppStackScreenProps, navigate } from "../../../../navigators"
import { MoreButton } from "../../../../utils/useHeader"
import { YStack } from "tamagui"
import { useBackHeader } from "../../../../utils/useBackHeader"
import { FlashList } from "@shopify/flash-list"
import { LessonCard } from "./LessonCard"
import { LessonSection } from "./LessonSection"
import { useStores } from "../../../../models"
import { isSection } from "../../models"

interface LessonListScreenProps extends AppStackScreenProps<"LessonList"> { }

export const LessonListScreen: FC<LessonListScreenProps> = observer(props => {
  const { navigation } = props
  const { courseDetailStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { flatLessons } = courseDetailStore

  useBackHeader({ titleTx: "common.lessons", RightActionComponent: <MoreButton /> })

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      await courseDetailStore.fetchLesson()
      setIsLoading(false)
    })()
  }, [])

  const ListEmptyComponent = useMemo(() => () => {
    return isLoading ? <ActivityIndicator /> : <EmptyState buttonOnPress={manualRefresh} />
  }, [isLoading])

  const renderItem = ({ item }) => {
    if (isSection(item)) {
      return <LessonSection title={item.name} duration={`${item.duration ?? 'N/A'} mins`} />
    }

    return (
      <LessonCard
        marginHorizontal="$6"
        index={item.index}
        name={item.name}
        locked={item.lock}
        duration={item.duration}
        onPress={() => navigate("CoursePlay")}
      />
    )
  }

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await courseDetailStore.fetchLesson()
    setRefreshing(false)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      <YStack w="$full" h="$full">
        <FlashList data={flatLessons}
          refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={manualRefresh} />}
          renderItem={renderItem}
          estimatedItemSize={200}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 24 }}
          ItemSeparatorComponent={() => <YStack h="$6" />}
          ListEmptyComponent={<ListEmptyComponent />}
        />
        <BottomNavigator
          borderColor="$divider"
          paddingTop="$6"
          paddingHorizontal="$6"
          borderWidth={0.5}
          borderBottomWidth={0}
          borderTopLeftRadius="$6"
          borderTopRightRadius="$6"
          position="relative"
        >
          <EduShadow preset="button_1">
            <Button text={`${translate("course.enrollCourse")} - $40`}
              onPress={() => navigation.push("CourseEnroll")}
            />
          </EduShadow>
        </BottomNavigator >
      </YStack>
    </Screen >
  )
})
