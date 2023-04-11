import { observer } from "mobx-react-lite"
import React, { FC, memo, useMemo, useRef } from "react"
import { EduActivityIndicator, EduRefreshControl, EmptyState, Screen } from "../../../../components"
import { isRTL } from "../../../../i18n"
import { useStores } from "../../../../models"
import { AppStackScreenProps } from "../../../../navigators"
import { SourceCard } from "../../components/SourceCard"
import { CategorySelect } from "../../../category/components/CategorySelect"
import { useSourcePagination } from "../../useSourcePagination"
import { YStack } from "tamagui"
import { useBackHeader } from "../../../../utils/useBackHeader"
import { FlashList } from "@shopify/flash-list"

interface SourceListScreenProps extends AppStackScreenProps<"SourceList"> { }

export const SourceListScreen: FC<SourceListScreenProps> = observer(_props => {
  const { navigation } = _props
  const { favoriteStore } = useStores()
  const [
    { sources, isLoading, refreshing, isLoadMore },
    { loadMore, manualRefresh, categoryChanged }
  ] = useSourcePagination()

  useBackHeader({ titleTx: "source.mostPopularCourses" })

  const HeaderComponent = useMemo(() => () => {
    return (
      <YStack backgroundColor="$background" pb="$4">
        <CategorySelect onChanged={(category) => categoryChanged(category?.label)} />
      </YStack>
    )
  }, [])

  const ListFooterComponent = useMemo(
    () => () => <EduActivityIndicator opacity={isLoadMore ? 1 : 0} />, [isLoadMore])

  const ListEmptyComponent = useMemo(() => () => {
    return isLoading ? (
      <EduActivityIndicator />
    ) : (
      <EmptyState
        preset="generic"
        style={{ marginTop: 48 }}
        buttonOnPress={manualRefresh}
        imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
        ImageProps={{ resizeMode: "contain" }} />
    )
  }, [isLoading])

  const ListItem = ({ item: $source }) => {
    // const MemoizedSourceCard = memo(SourceCard)
    return (
      <SourceCard
        marginHorizontal='$6'
        source={$source}
        bookmarked={favoriteStore.hasFavorite($source)}
        onPressBookmark={() => favoriteStore.toggleFavorite($source)}
        onPress={() => navigation.push("SourceDetail")}
      />
    )
  }


  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right"]}>
      <YStack h="$full">
        <HeaderComponent />
        <YStack flex={1}>
          <FlashList
            data={sources}
            // stickyHeaderIndices={[0]}
            // ListHeaderComponent={<HeaderComponent />}
            refreshControl={<EduRefreshControl refreshing={refreshing} onRefresh={manualRefresh} />}
            // refreshing={refreshing}
            // onRefresh={manualRefresh}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<ListEmptyComponent />}
            ListFooterComponent={<ListFooterComponent />}
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