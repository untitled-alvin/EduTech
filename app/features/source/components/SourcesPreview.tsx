import { observer } from "mobx-react-lite"
import React, { useMemo } from "react"
import { ActivityIndicator } from "react-native"
import { EmptyState } from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { SourceCard } from "./SourceCard"
import { useSourcePagination } from "../useSourcePagination"
import BigList from "react-native-big-list"
import { CategorySelect } from "../../category"
import { YStack, YStackProps } from "tamagui"

interface SourcesPreviewProps extends YStackProps { }

export const SourcesPreview = observer(function SourcesPreview(props: SourcesPreviewProps) {
  const { favoriteStore } = useStores()
  const [
    { sources, isLoading, refreshing, isLoadMore },
    { manualRefresh, categoryChanged }
  ] = useSourcePagination()

  const Categories = useMemo(() => function Categories() {
    return <CategorySelect onChanged={
      (category) => categoryChanged(category?.label)
    } />
  }, [])

  const renderFooter = () => isLoadMore ? <ActivityIndicator /> : <YStack />

  const renderItem = ({ item, index }) => {
    const source = item

    return (
      <SourceCard
        marginHorizontal="$6"
        key={source.id}
        source={source}
        bookmarked={favoriteStore.hasFavorite(source)}
        onPressBookmark={() => favoriteStore.toggleFavorite(source)}
        onPress={() => navigate("SourceDetail")}
      />
    )
  }

  return (
    <YStack w="$full">
      <Categories />
      <BigList
        data={sources}
        contentContainerStyle={{ justifyContent: "center", paddingVertical: 24 }}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={{ marginTop: 48 }}
              // buttonOnPress={manualRefresh}
              imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
              ImageProps={{ resizeMode: "contain" }} />
          )
        }
        showsVerticalScrollIndicator={false}
        renderFooter={renderFooter}
        footerHeight={50}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        itemHeight={180}
        renderItem={renderItem}
      />
    </YStack>
  )
})
