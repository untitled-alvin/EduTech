import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo } from "react"
import { YStack } from "tamagui"
import { EduActivityIndicator, EduRefreshControl, EmptyState } from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { SourceCard } from "./SourceCard"
import { HFlatList } from "react-native-head-tab-view"
import { navigate } from "../../../navigators"
import { useSourcePagination } from "../useSourcePagination"

interface SourcesMentorTabProps { index: number }

export const SourcesMentorTab: FC<SourcesMentorTabProps> = observer((props) => {
  const { index } = props
  const { favoriteStore } = useStores()
  const [
    { sources, isLoading, refreshing, isLoadMore },
    { loadMore, manualRefresh, categoryChanged }
  ] = useSourcePagination()

  useEffect(() => {
    categoryChanged('All')
  }, [])

  const ListFooterComponent = useMemo(() => () => isLoadMore ? <EduActivityIndicator /> : null, [isLoadMore])

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

  const renderItem = ({ item: $source }) => (
    <SourceCard
      source={$source}
      marginHorizontal='$5'
      bookmarked={favoriteStore.hasFavorite($source)}
      onPressBookmark={() => favoriteStore.toggleFavorite($source)}
      onPress={() => navigate("SourceDetail")}
    />
  )

  return (
    <HFlatList
      index={index}
      data={sources}
      extraData={sources.length}
      // refreshing={refreshing}
      // onRefresh={manualRefresh}
      // isRefreshing={refreshing}
      // onStartRefresh={manualRefresh}
      // refreshControl={<EduRefreshControl refreshing={refreshing} onRefresh={manualRefresh} />}
      onEndReached={loadMore}
      // renderRefreshControl={(props) => <EduRefreshControl refreshing={props.} onRefresh={manualRefresh} />}
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
