import { observer } from "mobx-react-lite"
import { Box } from "native-base"
import React, { FC, useCallback, useMemo } from "react"
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
} from "react-native"
import { EmptyState, Screen } from "../../../../components"
import { isRTL } from "../../../../i18n"
import { useStores } from "../../../../models"
import { AppStackScreenProps } from "../../../../navigators"
import { useHeader } from "../../../../utils/useHeader"
import { SourceCard } from "../../components/SourceCard"
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview"
import { CategorySelect } from "../../../category/components/Categories"
import { useSourcePagination } from "../../useSourcePagination"
import { Category } from "../../../category"

interface SourceListScreenProps extends AppStackScreenProps<"SourceList"> { }

export const SourceListScreen: FC<SourceListScreenProps> = observer(_props => {
  const { navigation } = _props
  const { favoriteStore } = useStores()
  const [
    { sources,
      isLoading,
      refreshing,
      isLoadMore },
    { load, loadMore, manualRefresh, categoryChanged }
  ] = useSourcePagination()
  // const [category, setCategory] = useState<Category>(null)

  useHeader({
    leftIcon: 'arrowLeft',
    onLeftPress: () => navigation.goBack(),
    titleTx: "source.mostPopularCourses",
  })

  const renderFooter = useCallback(() => {
    if (isLoading || isLoadMore) return <ActivityIndicator />

    if (!sources.length) {
      return (<EmptyState
        preset="generic"
        style={{ marginTop: 48 }}
        // buttonOnPress={manualRefresh}
        imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
        ImageProps={{ resizeMode: "contain" }}
      />)
    }

    return <Box />
  }, [isLoading, isLoadMore, sources])

  const rowRenderer = useCallback((type, item, index) => {
    const source = item

    return (
      <Box paddingLeft='5' paddingRight='5' >
        <SourceCard
          key={source.id}
          source={source}
          // bookmarked
          bookmarked={favoriteStore.hasFavorite(source)}
          onPressBookmark={() => favoriteStore.toggleFavorite(source)}
          onPress={() => navigation.push("SourceDetail")}
        />
      </Box>
    )
  }, [sources])

  const onCategoryChanged = useCallback((value?: Category) => {
    categoryChanged(value?.label)
    //   if (!value) {
    //   categoryChanged(value?.label)
    //   load()
    // } else {
    //   // setCategory()
    //   load()
    // }
  }, []);

  const ListCategory = useMemo(() => function ListCategory() {
    return (<CategorySelect onChanged={onCategoryChanged} />)
  }, [])

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right"]}>
      <Box marginBottom={4}>
        <ListCategory />
      </Box>

      <Box width={"full"} height={"full"} paddingBottom="20" >
        <RecyclerListView
          style={{ flex: 1 }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          dataProvider={new DataProvider((r1, r2) => {
            return r1 !== r2
          }).cloneWithRows(sources)}
          scrollViewProps={{
            // StickyHeaderComponent: <ListCategory />,
            // headerComponent: <ListCategory />,
            // StickyHeaders: <ListCategory />,
            // stickyHeaderIndices: 2,
            style: {


              // shadowColor: "#000000",
              // shadowOffset: {
              //   width: 0,
              //   height: 9,
              // },
              // // shadowOpacity: 0.22,
              // shadowOpacity: 0.1,
              // shadowRadius: 10.24,
              // // elevation: 13,
              // elevation: 3,

              // shadowColor: "#000",
              // shadowOffset: {
              //   width: 0,
              //   height: 4,
              // },
              // shadowOpacity: 0.06,
              // shadowRadius: 60,
              // elevation: 3,


              // backgroundColor: "yellow",
              // paddingTop: 36,
              paddingBottom: 36
            },
            showsVerticalScrollIndicator: false,
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
    </Screen>
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
