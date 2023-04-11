import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useState } from "react"
import {
  BottomNavigator, EmptyState, Screen, EduButton,
  EduShadow, EduBody,
  EduActivityIndicator
} from "../../../../components"
import { isRTL, translate } from "../../../../i18n"
import { AppStackScreenProps, navigate } from "../../../../navigators"
import { MoreCircleIcon } from "../../../../utils/useHeader"
import { delay } from "../../../../utils/delay"
import { XStack, YStack } from "tamagui"
import { useBackHeader } from "../../../../utils/useBackHeader"
import { FlashList } from "@shopify/flash-list"
import { isLesson, isSection, lessonData } from "./data"
import { LessonCard } from "./LessonCard"
import { LessonSection } from "./LessonSection"

interface LessonListScreenProps extends AppStackScreenProps<"LessonList"> { }

export const LessonListScreen: FC<LessonListScreenProps> = observer(_props => {
  const { navigation } = _props
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useBackHeader({
    titleTx: "common.lessons",
    RightActionComponent: <MoreCircleIcon />
  })

  useEffect(() => {
    load()
  }, [])

  const ListEmptyComponent = useMemo(() => () => {
    return isLoading ? (
      <EduActivityIndicator />
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

  const renderItem = ({ item }) => {
    if (isSection(item)) {
      return <LessonSection title={item.text} duration={item.duration} />

    } else if (isLesson(item)) {
      return (
        <LessonCard
          marginHorizontal="$6"
          locked={item.locked}
          number={`${('0' + item.index).slice(-2)}`}
          name={item.title}
          duration={item.duration}
          onPress={() => navigate("SourcePlay")}
        />
      )
    }
    return <YStack />
  }

  async function load() {
    setIsLoading(true)
    await Promise.all([delay(700)])
    setIsLoading(false)
  }

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([delay(700)])
    setRefreshing(false)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      <YStack w="$full" h="$full">
        <FlashList
          data={lessonData}
          refreshing={refreshing}
          onRefresh={manualRefresh}
          renderItem={renderItem}
          estimatedItemSize={200}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 24 }}
          ItemSeparatorComponent={() => <YStack h="$6" />}
          ListEmptyComponent={<ListEmptyComponent />}
        />
        <BottomNavigator
          borderColor="$divider"
          paddingTop="$6"
          paddingHorizontal="$6"
          borderWidth={0.5}
          borderBottomWidth={0}
          borderTopLeftRadius="$6"
          borderTopRightRadius="$6"
          position="relative"
        >
          <EduShadow preset="button_1">
            <EduButton text={`${translate("source.enrollCourse")} - $40`}
              onPress={() => navigation.push("EnrollSource")}
            />
          </EduShadow>
        </BottomNavigator >
      </YStack>
    </Screen >
  )
})
