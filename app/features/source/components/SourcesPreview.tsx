import { observer } from "mobx-react-lite"
import { Box, IBoxProps } from "native-base"
import React, { FC, useEffect, useMemo, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
} from "react-native"
import { EmptyState } from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { Source } from "../models/Source"
import { navigate } from "../../../navigators"
import { SourceCard } from "./SourceCard"

interface SourcesPreviewProps extends IBoxProps { }

export const SourcesPreview: FC<SourcesPreviewProps> = observer(function SourcesPreview(_props) {
  const { sourceStore, favoriteStore } = useStores()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    load();
  }, [])

  const load = async () => {
    setIsLoading(true)
    // await sourceStore.refresh()
    sourceStore.init()
    await sourceStore.fetchSources()
    setIsLoading(false)
  }

  return <FlatList<Source>
    data={sourceStore.sourcesForList}
    extraData={favoriteStore.ids.length + sourceStore.sourcesForList.length}
    // refreshing={refreshing}
    // ListHeaderComponent={<ListCategory />}
    // onRefresh={manualRefresh}
    // contentContainerStyle={$contentContainerStyle}
    showsVerticalScrollIndicator={false}
    ItemSeparatorComponent={() => <Box height="6" />}
    renderItem={({ index }) => {
      const item = sourceStore.sourcesForList[index]

      return (
        <Box paddingLeft='5' paddingRight='5' >
          <SourceCard
            key={item.id}
            source={item}
            bookmarked={favoriteStore.hasFavorite(item)}
            onPressBookmark={() => favoriteStore.toggleFavorite(item)}
            onPress={() => navigate("SourceDetail")}
          />
        </Box>
      )
    }}
    // ListFooterComponent={() => <Box height="6" />}
    // ListFooterComponent={isLoadMore ? (<ActivityIndicator />) : (<Box />)}
    // onEndReached={loadMore}
    ListEmptyComponent={
      isLoading ? (
        <ActivityIndicator />
      ) : (
        <EmptyState
          preset="generic"
          // buttonOnPress={manualRefresh}
          imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
          ImageProps={{ resizeMode: "contain" }}
        />
      )
    }
  />
})
