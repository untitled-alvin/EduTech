import { observer } from "mobx-react-lite"
import React, { useMemo } from "react"
import { ActivityIndicator, EmptyState } from "../../../components"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { CourseCard } from "./CourseCard"
import { useCoursePagination } from "../useCoursePaginationSheetson"
import { CategorySelect } from "../../category"
import { YStack, YStackProps } from "tamagui"
import { FlashList } from "@shopify/flash-list"

interface CoursesPreviewProps extends YStackProps { }

export const CoursesPreview = observer((_props: CoursesPreviewProps) => {
  const { favoriteStore } = useStores()
  const {
    courses,
    isLoading,
    refreshing,
    isLoadMore,
    manualRefresh,
    categoryChanged
  } = useCoursePagination()

  const Categories = useMemo(() => () => (
    <CategorySelect onChanged={(value) => categoryChanged(value?.label)} />
  ), [])

  const ListFooterComponent = useMemo(() => () => {
    return isLoadMore ? <ActivityIndicator /> : <YStack />
  }, [isLoadMore])

  const ListEmptyComponent = useMemo(() => () => {
    return isLoading ? <ActivityIndicator /> : <EmptyState />
  }, [isLoading])

  const renderItem = ({ item: $course }) => {
    return (
      <CourseCard
        marginHorizontal="$6"
        course={$course}
        bookmarked={favoriteStore.hasFavorite($course)}
        onPressBookmark={() => favoriteStore.toggleFavorite($course)}
        onPress={() => navigate("CourseDetail")}
      />
    )
  }

  return (
    <YStack w="$full" flex={1} pb="$10">
      <Categories />
      <FlashList
        data={courses}
        ItemSeparatorComponent={() => <YStack h="$4" />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ListEmptyComponent />}
        ListFooterComponent={<ListFooterComponent />}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        estimatedItemSize={180}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 24, paddingBottom: 48 }}
      />
    </YStack>
  )
})
