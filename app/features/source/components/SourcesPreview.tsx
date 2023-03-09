import { observer } from "mobx-react-lite"
import { Box, Column, IBoxProps } from "native-base"
import React, { FC, useMemo } from "react"
import { ActivityIndicator } from "react-native"
import { EmptyState } from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { SourceCard } from "./SourceCard"
import { useSourcePagination } from "../useSourcePagination"
import BigList from "react-native-big-list"
import { CategorySelect } from "../../category"

interface SourcesPreviewProps extends IBoxProps { }


// export const ProfileAvatarForm = observer(function ProfileAvatarForm(
//   _props: ProfileAvatarFormProps
// ) {

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

  const renderFooter = () => isLoadMore ? <ActivityIndicator /> : <Box />

  const renderItem = ({ item, index }) => {
    const source = item

    return (
      <SourceCard
        marginLeft='5'
        marginRight='5'
        key={source.id}
        source={source}
        bookmarked={favoriteStore.hasFavorite(source)}
        onPressBookmark={() => favoriteStore.toggleFavorite(source)}
        onPress={() => navigate("SourceDetail")}
      />
    )
  }

  return (
    <Column>
      <Box><Categories /></Box>
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
    </Column>
  )
})
