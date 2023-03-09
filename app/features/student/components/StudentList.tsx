import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
} from "react-native"
import { EmptyState } from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { Mentor } from "../models/Student"
import { delay } from "../../../utils/delay"
import { StudentListTile } from "./StudentListTile"

interface StudentListProps { }

export const StudentList: FC<StudentListProps> = observer(function StudentList(_props) {
  const { mentorStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    (async function load() {
      setIsLoading(true)
      await mentorStore.fetchMentors()
      setIsLoading(false)
    })()
  }, [mentorStore])

  const rowRenderer = useCallback(({ item, index }) => {
    const student = mentorStore.mentorsForList[index]
    return <StudentListTile key={student.guid} student={student} />
  }, [])

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


  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([mentorStore.fetchMentors(), delay(750)])
    setRefreshing(false)
  }

  return (
    <FlatList<Mentor>
      data={mentorStore.mentorsForList}
      extraData={mentorStore.favorites.length + mentorStore.mentors.length}
      ListEmptyComponent={<ListEmptyComponent />}
      refreshing={refreshing}
      onRefresh={manualRefresh}
      renderItem={rowRenderer}
    />
  )
},
)
