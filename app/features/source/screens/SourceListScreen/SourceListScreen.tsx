import { observer } from "mobx-react-lite"
import { Box, Center, Column } from "native-base"
import React, { FC, useMemo } from "react"
import { ActivityIndicator } from "react-native"
import { EmptyState, Screen } from "../../../../components"
import { isRTL } from "../../../../i18n"
import { useStores } from "../../../../models"
import { AppStackScreenProps } from "../../../../navigators"
import { useHeader } from "../../../../utils/useHeader"
import { SourceCard } from "../../components/SourceCard"
import { CategorySelect } from "../../../category/components/CategorySelect"
import { useSourcePagination } from "../../useSourcePagination"
import BigList from "react-native-big-list";
import { Source } from "../../models"

interface SourceListScreenProps extends AppStackScreenProps<"SourceList"> { }

export const SourceListScreen: FC<SourceListScreenProps> = observer(_props => {
  const { navigation } = _props
  const { favoriteStore } = useStores()
  const [
    { sources, isLoading, refreshing, isLoadMore },
    { loadMore, manualRefresh, categoryChanged }
  ] = useSourcePagination()

  useHeader({
    leftIcon: 'arrowLeft',
    onLeftPress: () => navigation.goBack(),
    titleTx: "source.mostPopularCourses",
  })

  const Categories = useMemo(() => function Categories() {
    return <CategorySelect onChanged={
      (category) => categoryChanged(category?.label)
    } />
  }, [])

  const renderFooter = () => isLoadMore ? <ActivityIndicator /> : <Box />

  const renderItem = ({ item, index }) => {
    return (
      <SourceCard
        marginLeft='5'
        marginRight='5'
        key={item.id}
        source={item}
        bookmarked={favoriteStore.hasFavorite(item)}
        onPressBookmark={() => favoriteStore.toggleFavorite(item)}
        onPress={() => navigation.push("SourceDetail")}
      />
    )
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right"]}>
      <Center height="full">
        <Center width="full" marginBottom="4" ><Categories /></Center>

        <Center width="full" flex="1">
          <BigList<Source>
            data={sources}
            refreshing={refreshing}
            onRefresh={manualRefresh}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              isLoading ? (
                <ActivityIndicator style={{ alignSelf: "center" }} />
              ) : (
                <EmptyState
                  preset="generic"
                  style={{ marginTop: 48 }}
                  // buttonOnPress={manualRefresh}
                  imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
                  ImageProps={{ resizeMode: "contain" }} />
              )
            }
            footerHeight={50}
            renderFooter={renderFooter}
            itemHeight={180}
            renderItem={renderItem}
            onEndReached={loadMore}
            contentContainerStyle={{ justifyContent: "center", paddingVertical: 24 }}
            showsVerticalScrollIndicator={false}
          />
        </Center>
      </Center>
    </Screen>
  )
})