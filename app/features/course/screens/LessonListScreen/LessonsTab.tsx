import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { XStack, YStack } from "tamagui"
import { HScrollView } from "react-native-head-tab-view"
import { LessonCard } from "./LessonCard"
import { LessonSection } from "./LessonSection"
import { Heading, LinkButton, } from "../../../../components"
import { navigate } from "../../../../navigators"
import { useStores } from "../../../../models"
import { translate } from "../../../../i18n"
import { Lesson } from "../../../../services/edu-api"

export const LessonsTab = observer((props: { index: number }) => {
  const { courseDetailStore } = useStores()
  const { lessonNumber = "N/A", groupLessons } = courseDetailStore

  useEffect(() => {
    courseDetailStore.fetchLesson()
  }, [])

  return (
    <HScrollView index={props.index} showsVerticalScrollIndicator={false}>
      <YStack >
        <XStack marginVertical="$4" paddingHorizontal="$6" ai="center" jc="space-between">
          <Heading preset="h5" numberOfLines={1} flex={1}
            text={`${lessonNumber} ${translate("common.lessons")}`} />
          <LinkButton text="See All" onPress={() => navigate("LessonList")} />
        </XStack>
        {groupLessons && Object.entries(groupLessons).map(([key, value], index) => {
          return (
            <GroupLesson
              index={index}
              section={key}
              lessons={value as Lesson[]}
            />
          )
        })}
      </YStack>
    </ HScrollView>
  )
})

const GroupLesson = (props: { section: string, lessons: Lesson[], index: number }) => {
  const { section, lessons, index } = props
  const duration: number = lessons?.reduce((arr, value) => arr + value.duration, 0)
  const title = `${translate("common.section")} ${index + 1} - ${section}`

  return (
    <YStack key={index} space="$6" pb="$6">
      <LessonSection title={title} duration={`${duration} mins`} />
      {lessons?.map((item) => (
        <LessonCard marginHorizontal="$6"
          key={`${index}-${item.index}`}
          index={item.index}
          name={item.name}
          locked={item.lock}
          duration={item.duration}
          onPress={() => navigate("CoursePlay")}
        />
      ))}
    </YStack>
  )
}

{/*// @ts-ignore */ }
// return (
//   <Tabs.ScrollView
//     scrollEnabled
//     style={styles.container}
//     contentContainerStyle={styles.content}
//   // refreshControl={
//   //   <RefreshControl refreshing={isRefreshing} onRefresh={startRefreshing} />
//   // }
//   >
//     <Box>
//       <Row
//         paddingLeft="2"
//         paddingRight="6"
//         alignItems="center"
//         justifyContent="space-between"
//       >
//         <Heading flex={1} text="124 Lessons" />
//         <LinkButton onPress={() => { }}>
//           See All
//         </LinkButton>
//       </Row>

//       <Section />

//       <Section title="Section 2 - Figma Basic" duration="60 mins" />
//     </Box>


//   </Tabs.ScrollView>
// )

{/*
 {flatLessons?.map((item, index) => {
if (courseDetailStore.isSection(item)) {
return (
<LessonSection key={index}
mb="$6"
title={item.name}
duration={`${item.duration ?? 'N/A'} mins`}
/>
)
} else {
return (
<LessonCard key={index}
mb="$6"
marginHorizontal="$6"
locked={item.lock}
number={`${('0' + item.index).slice(-2)}`}
name={item.name}
duration={`${item.duration} mins`}
onPress={() => navigate("CoursePlay")}
/>
)}})} 
*/}