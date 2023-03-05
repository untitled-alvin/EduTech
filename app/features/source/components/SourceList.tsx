import { observer } from "mobx-react-lite"
import { Box } from "native-base"
import React, { FC, useCallback, useEffect, useState } from "react"
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
} from "react-native"
import { EmptyState } from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { delay } from "../../../utils/delay"
import { SourceCard } from "./SourceCard"
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview"
import { navigate } from "../../../navigators"

interface SourceListProps { }

export const SourceList: FC<SourceListProps> = observer(_props => {
  const { sourceStore, favoriteStore } = useStores()
  const { sourcesForList } = sourceStore
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)

  useEffect(() => {
    sourceStore.init()
    load()
    return sourceStore.init()
  }, [])

  const renderFooter = useCallback(() => {
    if (isLoading || isLoadMore) return <ActivityIndicator />

    if (!sourcesForList.length) {
      return (<EmptyState
        preset="generic"
        style={{ marginTop: 48 }}
        buttonOnPress={manualRefresh}
        imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
        ImageProps={{ resizeMode: "contain" }}
      />
      )
    }
    return <Box />
  }, [])

  const rowRenderer = useCallback((type, item, index) => {
    const source = sourceStore.sourcesForList[index]

    return (
      <Box paddingLeft='5' paddingRight='5' >
        <SourceCard
          key={source.id}
          source={source}
          bookmarked={favoriteStore.hasFavorite(source)}
          onPressBookmark={() => favoriteStore.toggleFavorite(source)}
          onPress={() => navigate("SourceDetail")}
        />
      </Box>
    )
  }, [])

  const load = useCallback(async () => {
    setIsLoading(true)
    await sourceStore.refresh()
    setIsLoading(false)
  }, []);

  const manualRefresh = useCallback(async () => {
    setRefreshing(true)
    await Promise.all([sourceStore.refresh(), delay(750)])
    setRefreshing(false)
  }, []);

  const loadMore = useCallback(async () => {
    if (!refreshing && !isLoading && !isLoadMore && !sourceStore.isEnd) {
      setIsLoadMore(true)
      await Promise.all([sourceStore.next(), delay(750)])
      setIsLoadMore(false)
    }
  }, []);

  return (
    <Box width={"full"} height={"full"} paddingBottom="20" >
      <RecyclerListView
        style={{ flex: 1 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        dataProvider={new DataProvider((r1, r2) => {
          return r1 !== r2
        }).cloneWithRows(sourcesForList)}
        scrollViewProps={{
          style: {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.06,
            shadowRadius: 60,
            elevation: 2,
            // backgroundColor: "blue"

            paddingBottom: 36
          },
          showsVerticalScrollIndicator: false,
          // ItemSeparatorComponent: <Box height="2" />,
          refreshControl: (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={manualRefresh}
            />
          )
        }}
        renderFooter={renderFooter}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
      />
    </Box>
  )
})

//Adjustment for margin given to RLV;
const windowWidth = Math.round(Dimensions.get('window').width * 1000) / 1000 - 6;

const layoutProvider = new LayoutProvider(
  (index) => 'NORMAL',
  (type, dim) => {
    dim.width = windowWidth
    dim.height = 180
  })
