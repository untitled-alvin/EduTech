import { Box } from "native-base"
import React, { FC, useEffect, useMemo } from "react"
import { ActivityIndicator } from "react-native"
import { HFlatList } from "react-native-head-tab-view"
import { EmptyState } from "../../../components"
import { isRTL } from "../../../i18n"
import { useStudentPagination } from "../useStudentPagination"
import { StudentListTile } from "./StudentListTile"

interface StudentTabProps {
  index: number
}

export const StudentTab: FC<StudentTabProps> = function StudentTab(props) {
  const [
    { students,
      isLoading,
      refreshing,
      isLoadMore },
    { manualRefresh, initialLoad, loadMore }
  ] = useStudentPagination()

  useEffect(() => {
    initialLoad()
  }, [])

  const ListFooterComponent = useMemo(() => function ListFooterComponent() {
    return isLoadMore ? <ActivityIndicator /> : <Box />
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
    return <StudentListTile key={item.guid} student={item} />
  }

  return (
    <HFlatList index={props.index}
      data={students}
      extraData={students.length}
      // refreshing={refreshing}
      // onRefresh={manualRefresh}
      onEndReached={loadMore}
      ItemSeparatorComponent={() => <Box height="2" />}
      renderItem={renderItem}
      onEndReachedThreshold={0.5}
      isRefreshing={refreshing}
      onStartRefresh={manualRefresh}
      ListEmptyComponent={<ListEmptyComponent />}
      ListFooterComponent={<ListFooterComponent />}
      style={{ marginTop: 24, paddingBottom: 24 }}
      // contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.guid.toString()}
    />
  )
}

