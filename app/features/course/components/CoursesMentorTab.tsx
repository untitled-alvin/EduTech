import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo } from "react"
import { YStack } from "tamagui"
import { EduActivityIndicator, RefreshControl, EmptyState } from "../../../components"
import { useStores } from "../../../models"
import { CourseCard } from "./CourseCard"
import { HFlatList } from "react-native-head-tab-view"
import { navigate } from "../../../navigators"
import { useCoursePagination } from "../useCoursePagination"

interface CoursesMentorTabProps { index: number }

export const CoursesMentorTab: FC<CoursesMentorTabProps> = observer((props) => {
  const { index } = props
  const { favoriteStore } = useStores()
  const {
    courses,
    isLoading,
    refreshing,
    isLoadMore,
    loadMore,
    manualRefresh,
    categoryChanged
  } = useCoursePagination()

  useEffect(() => {
    categoryChanged('All')
  }, [])

  const ListFooterComponent = useMemo(() => () => isLoadMore ? <EduActivityIndicator /> : null, [isLoadMore])

  const ListEmptyComponent = useMemo(() => () => {
    return isLoading ? <EduActivityIndicator /> : <EmptyState buttonOnPress={manualRefresh} />
  }, [isLoading])

  const renderItem = ({ item: $course }) => (
    <CourseCard
      course={$course}
      marginHorizontal='$5'
      bookmarked={favoriteStore.hasFavorite($course)}
      onPressBookmark={() => favoriteStore.toggleFavorite($course)}
      onPress={() => navigate("CourseDetail")}
    />
  )

  return (
    <HFlatList
      index={index}
      data={courses}
      extraData={courses.length}
      // refreshing={refreshing}
      // onRefresh={manualRefresh}
      // isRefreshing={refreshing}
      // onStartRefresh={manualRefresh}
      // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={manualRefresh} />}
      onEndReached={loadMore}
      // renderRefreshControl={(props) => <RefreshControl refreshing={props.} onRefresh={manualRefresh} />}
      // renderRefreshControl={(props) => <EduActivityIndicator />}
      ItemSeparatorComponent={() => <YStack h="$2" />}
      renderItem={renderItem}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={<ListEmptyComponent />}
      ListFooterComponent={<ListFooterComponent />}
      style={{ paddingTop: 24, paddingBottom: 24 }}
      // contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
    />
  )
})
