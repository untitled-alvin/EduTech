import { observer } from "mobx-react-lite"
import React, { FC, memo, useCallback, useMemo, useRef } from "react"
import { EduActivityIndicator, RefreshControl, EmptyState, Screen } from "../../../../components"
import { useStores } from "../../../../models"
import { AppStackScreenProps } from "../../../../navigators"
import { CourseCard } from "../../components/CourseCard"
import { CategorySelect } from "../../../category/components/CategorySelect"
import { YStack } from "tamagui"
import { useBackHeader } from "../../../../utils/useBackHeader"
import { FlashList } from "@shopify/flash-list"
import { useCoursePagination } from "../../useCoursePaginationSheetson"

interface CourseListScreenProps extends AppStackScreenProps<"CourseList"> { }

export const CourseListScreen: FC<CourseListScreenProps> = observer(props => {
  const { navigation } = props
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

  useBackHeader({ titleTx: "course.mostPopularCourses" })

  const HeaderComponent = useMemo(() => () => {
    return (
      <YStack backgroundColor="$background" pb="$4">
        <CategorySelect onChanged={(category) => categoryChanged(category?.label)} />
      </YStack>
    )
  }, [])

  const FooterComponent = useMemo(
    () => () => <EduActivityIndicator opacity={isLoadMore ? 1 : 0} />, [isLoadMore])

  const EmptyComponent = useMemo(() => () => {
    return isLoading ? <EduActivityIndicator /> : <EmptyState buttonOnPress={manualRefresh} />
  }, [isLoading])

  const ListItem = useCallback(({ item: $course }) => {
    // const MemoizedCourseCard = memo(CourseCard)
    return (
      <CourseCard
        marginHorizontal='$6'
        course={$course}
        bookmarked={favoriteStore.hasFavorite($course)}
        onPressBookmark={() => favoriteStore.toggleFavorite($course)}
        onPress={() => navigation.push("CourseDetail", $course)}
      />
    )
  }, [])

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right"]}>
      <YStack h="$full">
        <HeaderComponent />
        <YStack flex={1}>
          <FlashList
            data={courses}
            // stickyHeaderIndices={[0]}
            // ListHeaderComponent={<HeaderComponent />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={manualRefresh} />}
            // keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<EmptyComponent />}
            ListFooterComponent={<FooterComponent />}
            ItemSeparatorComponent={(_) => <YStack h="$4" />}
            estimatedItemSize={180}
            getItemType={(_) => "row"}
            contentContainerStyle={{ paddingTop: 24 }}
            renderItem={ListItem}
            onEndReached={loadMore}
            onEndReachedThreshold={0.4}
            showsVerticalScrollIndicator={false}
          />
        </YStack>
      </YStack>
    </Screen>
  )
})