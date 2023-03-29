import { observer } from "mobx-react-lite"
import React, { FC, useMemo } from "react"
import { ActivityIndicator } from "react-native"
import { EmptyState, Screen } from "../../../../components"
import { isRTL } from "../../../../i18n"
import { useStores } from "../../../../models"
import { AppStackScreenProps } from "../../../../navigators"
import { SourceCard } from "../../components/SourceCard"
import { CategorySelect } from "../../../category/components/CategorySelect"
import { useSourcePagination } from "../../useSourcePagination"
import { Source } from "../../models"
import { YStack } from "tamagui"
import { useBackHeader } from "../../../../utils/useBackHeader"
import BigList from "react-native-big-list";

interface SourceListScreenProps extends AppStackScreenProps<"SourceList"> { }

export const SourceListScreen: FC<SourceListScreenProps> = observer(_props => {
  const { navigation } = _props
  const { favoriteStore } = useStores()
  const [
    { sources, isLoading, refreshing, isLoadMore },
    { loadMore, manualRefresh, categoryChanged }
  ] = useSourcePagination()

  useBackHeader({
    titleTx: "source.mostPopularCourses"
  })

  const CategoriesComponent = useMemo(() => function CategoriesComponent() {
    return <CategorySelect onChanged={
      (category) => categoryChanged(category?.label)
    } />
  }, [])

  const ListEmptyComponent = useMemo(() => function ListEmptyComponent() {
    return isLoading ? (
      <ActivityIndicator />
    ) : (
      <EmptyState
        preset="generic"
        style={{ marginTop: 48 }}
        // buttonOnPress={manualRefresh}
        imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
        ImageProps={{ resizeMode: "contain" }} />
    )
  }, [isLoading])

  const renderFooter = () => isLoadMore ? <ActivityIndicator /> : <YStack />

  const renderItem = ({ item, index }) => {
    return (
      <SourceCard
        marginHorizontal='$6'
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
      <YStack h="$full">
        <YStack w="$full" mb="$4" bc="transparent" >
          <CategoriesComponent />
        </YStack>

        <YStack flex={1}>
          <BigList<Source>
            data={sources}
            refreshing={refreshing}
            onRefresh={manualRefresh}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<ListEmptyComponent />}
            footerHeight={50}
            renderFooter={renderFooter}
            itemHeight={180}
            renderItem={renderItem}
            onEndReached={loadMore}
            contentContainerStyle={{ justifyContent: "center", paddingVertical: 24 }}
            showsVerticalScrollIndicator={false}
          />
        </YStack>
      </YStack>
    </Screen>
  )
})