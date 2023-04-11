import { observer } from "mobx-react-lite"
import React, { useMemo } from "react"
import { EduActivityIndicator, EmptyState } from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { SourceCard } from "./SourceCard"
import { useSourcePagination } from "../useSourcePagination"
import { CategorySelect } from "../../category"
import { YStack, YStackProps } from "tamagui"
import { FlashList } from "@shopify/flash-list"

interface SourcesPreviewProps extends YStackProps { }

export const SourcesPreview = observer((_props: SourcesPreviewProps) => {
  const { favoriteStore } = useStores()
  const [
    { sources, isLoading, refreshing, isLoadMore },
    { manualRefresh, categoryChanged }
  ] = useSourcePagination()

  const Categories = useMemo(() => () => <CategorySelect
    onChanged={(category) => categoryChanged(category?.label)}
  />, [])

  const ListFooterComponent = useMemo(() => () => {
    return isLoadMore ? <EduActivityIndicator /> : <YStack />
  }, [isLoadMore])

  const ListEmptyComponent = useMemo(() => () => {
    return isLoading ? (
      <EduActivityIndicator />
    ) : (
      <EmptyState
        preset="generic"
        style={{ marginTop: 48 }}
        imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
        ImageProps={{ resizeMode: "contain" }} />
    )
  }, [isLoading])

  const renderItem = ({ item: $source }) => {
    return (
      <SourceCard
        marginHorizontal="$6"
        source={$source}
        bookmarked={favoriteStore.hasFavorite($source)}
        onPressBookmark={() => favoriteStore.toggleFavorite($source)}
        onPress={() => navigate("SourceDetail")}
      />
    )
  }

  return (
    <YStack w="$full" flex={1} pb="$10">
      <Categories />
      <FlashList
        data={sources}
        ItemSeparatorComponent={() => <YStack h="$4" />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ListEmptyComponent />}
        ListFooterComponent={<ListFooterComponent />}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        estimatedItemSize={180}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 24, paddingBottom: 48 }}
      />
    </YStack>
  )
})
