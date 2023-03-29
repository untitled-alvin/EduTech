import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo } from "react"
import { YStack } from "tamagui"
import { ActivityIndicator } from "react-native"
import { EmptyState } from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { SourceCard } from "./SourceCard"
import { HFlatList } from "react-native-head-tab-view"
import { navigate } from "../../../navigators"
import { useSourcePagination } from "../useSourcePagination"

interface SourcesMentorTabProps { index: number }

export const SourcesMentorTab: FC<SourcesMentorTabProps> = observer(props => {
  const { favoriteStore } = useStores()
  const [
    { sources, isLoading, refreshing, isLoadMore },
    { loadMore, manualRefresh, categoryChanged }
  ] = useSourcePagination()

  useEffect(() => {
    categoryChanged('All')
  }, [])

  const ListFooterComponent = useMemo(() => function ListFooterComponent() {
    return isLoadMore ? <ActivityIndicator /> : <YStack />
  }, [isLoadMore])

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

  const renderItem = ({ item, index }) => {
    const source = item

    return (
      <SourceCard
        marginHorizontal='$5'
        key={source.id}
        source={source}
        bookmarked={favoriteStore.hasFavorite(source)}
        onPressBookmark={() => favoriteStore.toggleFavorite(source)}
        onPress={() => navigate("SourceDetail")}
      />
    )
  }

  return (
    <HFlatList index={props.index}
      data={sources}
      extraData={sources.length}
      // refreshing={refreshing}
      // onRefresh={manualRefresh}
      // isRefreshing={refreshing}
      // onStartRefresh={manualRefresh}
      onEndReached={loadMore}
      // renderRefreshControl={() => <ActivityIndicator />}
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
