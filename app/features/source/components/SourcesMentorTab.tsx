import { observer } from "mobx-react-lite"
import { Box } from "native-base"
import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import {
  ActivityIndicator,
  Dimensions,
} from "react-native"
import { EmptyState } from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { delay } from "../../../utils/delay"
import { SourceCard } from "./SourceCard"
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview"
import { HFlatList } from "react-native-head-tab-view"
import { navigate } from "../../../navigators"

interface SourcesMentorTabProps {
  index: number
}

export const SourcesMentorTab: FC<SourcesMentorTabProps> = observer(props => {
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

  const rowRenderer = useCallback(({ item, index }) => {
    const source = sourcesForList[index]
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

  const ListFooterComponent = useMemo(() => function ListFooterComponent() {
    return (isLoadMore) ? (<ActivityIndicator />) : (<Box />)
  }, [isLoadMore])

  const ListEmptyComponent = useMemo(() => function ListEmptyComponent() {
    // return <EmptyState
    //   preset="generic"
    //   style={{ marginTop: 48 }}
    //   buttonOnPress={manualRefresh}
    //   imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
    //   ImageProps={{ resizeMode: "contain" }}
    // />
    return (isLoading) ? (
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
  }, [isLoading,])

  return (
    <HFlatList
      data={sourcesForList}
      extraData={sourcesForList.length}
      keyExtractor={(item) => item.id.toString()}
      refreshing={refreshing}
      onRefresh={manualRefresh}
      renderItem={rowRenderer}
      ItemSeparatorComponent={() => <Box height="2" />}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={<ListEmptyComponent />}
      ListFooterComponent={<ListFooterComponent />}
      style={{ marginTop: 24 }}
      // contentContainerStyle={{ marginTop: 24 }}
      showsVerticalScrollIndicator={false}
      index={props.index}
    // onEndReached={loadMore}
    />
  )
})

// return <List />

// const List = useMemo(() => function List() {
//   return (
//     <FlatList<Source>
//       ref={flatListRef}
//       data={sourcesForList}
//       extraData={sourcesForList.length}
//       keyExtractor={(item) => item.id.toString()}
//       // onViewableItemsChanged={() => {
//       //   flatListRef?.current?.scrollToOffset({ animated: false, offset: scrollPositionRef.current })
//       // }}
//       // onScroll={(event) => scrollPositionRef.current = event.nativeEvent.contentOffset.y}
//       // // onContentSizeChange={(contentWidth, contentHeight) => {
//       // //   ref?.current?.scrollToEnd({ animated: false })
//       // // }}
//       refreshing={refreshing}
//       onRefresh={manualRefresh}
//       renderItem={rowRenderer}
//       onEndReachedThreshold={0.5}
//       // ListEmptyComponent={<ListEmptyComponent />}
//       // ListFooterComponent={<ListFooterComponent />}
//       contentContainerStyle={{ paddingTop: 24 }}
//       showsVerticalScrollIndicator={false}
//     // onEndReached={loadMore}
//     />
//   )
// }, [])

// export const SourcesMentorTab: FC<SourcesMentorTabProps> = observer(props => {
//   const { sourceStore, favoriteStore } = useStores()
//   const { sourcesForList } = sourceStore
//   const [refreshing, setRefreshing] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [isLoadMore, setIsLoadMore] = useState(false)

//   useEffect(() => {
//     sourceStore.init()
//     load()
//     return sourceStore.init()
//   }, [])

//   const renderFooter = useCallback(() => {
//     if (isLoading || isLoadMore) return <ActivityIndicator />

//     if (!sourcesForList.length) {
//       return (<EmptyState
//         preset="generic"
//         style={{ marginTop: 48 }}
//         buttonOnPress={manualRefresh}
//         imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
//         ImageProps={{ resizeMode: "contain" }}
//       />
//       )
//     }
//     return <Box />
//   }, [])

//   const rowRenderer = useCallback((type, item, index) => {
//     const source = sourcesForList[index]

//     return (
//       <Box paddingLeft='5' paddingRight='5' >
//         <SourceCard
//           key={source.id}
//           source={source}
//           isFavorite={favoriteStore.hasFavorite(source)}
//           onPressFavorite={() => favoriteStore.toggleFavorite(source)}
//         />
//       </Box>
//     )
//   }, [])

//   const load = useCallback(async () => {
//     setIsLoading(true)
//     await sourceStore.refresh()
//     setIsLoading(false)
//   }, []);

//   const manualRefresh = useCallback(async () => {
//     setRefreshing(true)
//     await Promise.all([sourceStore.refresh(), delay(750)])
//     setRefreshing(false)
//   }, []);

//   const loadMore = useCallback(async () => {
//     if (!refreshing && !isLoading && !isLoadMore && !sourceStore.isEnd) {
//       setIsLoadMore(true)
//       await Promise.all([sourceStore.next(), delay(750)])
//       setIsLoadMore(false)
//     }
//   }, []);

//   return (
//     <ScrollView showsVerticalScrollIndicator={false}
//       accessibilityTraits={undefined}
//       // onEndReached={loadMore}
//       refreshControl={<RefreshControl
//         refreshing={refreshing}
//         onRefresh={manualRefresh}
//       />}
//       accessibilityComponentType={undefined}
//     >

//       <RecyclerListView
//         style={{ flex: 1 }}
//         onEndReached={loadMore}
//         onEndReachedThreshold={0.5}
//         dataProvider={new DataProvider((r1, r2) => {
//           return r1 !== r2
//         }).cloneWithRows(sourcesForList)}
//         scrollViewProps={{
//           style: {
//             shadowColor: "#000",
//             shadowOffset: {
//               width: 0,
//               height: 4,
//             },
//             shadowOpacity: 0.06,
//             shadowRadius: 60,
//             elevation: 3,
//             // backgroundColor: "blue"

//             paddingBottom: 36
//           },
//           showsVerticalScrollIndicator: false,
//           // ItemSeparatorComponent: <Box height="2" />,
//           // refreshControl: (
//           //   <RefreshControl
//           //     refreshing={refreshing}
//           //     onRefresh={manualRefresh}
//           //   />
//           // )
//         }}
//         renderFooter={renderFooter}
//         layoutProvider={layoutProvider}
//         rowRenderer={rowRenderer}
//       />
//     </ScrollView>
//   )
// })

//Adjustment for margin given to RLV;
const windowWidth = Math.round(Dimensions.get('window').width * 1000) / 1000 - 6;

const layoutProvider = new LayoutProvider(
  (index) => 'NORMAL',
  (type, dim) => {
    dim.width = windowWidth
    dim.height = 180
  })
