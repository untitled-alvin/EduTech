import React from "react"
import { Heading, LinkButton, } from "../../../../components"
import { LessonSection } from "./LessonSection"
import { navigate } from "../../../../navigators"
import { HScrollView } from "react-native-head-tab-view"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../../models"
import { XStack, YStack } from "tamagui"
import { isLesson, isSection, lessonData } from "./data"
import { LessonCard } from "./LessonCard"


type LessonsTabProps = { index: number }

export const LessonsTab = observer((props: LessonsTabProps) => {
  const { courseDetailStore } = useStores()

  return (
    <HScrollView index={props.index} showsVerticalScrollIndicator={false}>
      <YStack >
        <XStack marginVertical="$4" paddingHorizontal="$6" ai="center" jc="space-between">
          <Heading preset="h5" numberOfLines={1} flex={1} text="124 Lessons" />
          <LinkButton onPress={() => { navigate("LessonList") }}>
            See All
          </LinkButton>
        </XStack>

        {lessonData.map((item, index) => {
          if (isSection(item)) {
            return (
              <LessonSection
                mb="$6"
                key={index}
                title={item.text}
                duration={item.duration}
              />
            )
          } else if (isLesson(item)) {
            return (
              <LessonCard
                key={index}
                mb="$6"
                marginHorizontal="$6"
                locked={item.locked}
                number={`${('0' + item.index).slice(-2)}`}
                name={item.title}
                duration={item.duration}
                onPress={() => navigate("CoursePlay")}
              />
            )
          }

          return <YStack />

        })}
      </YStack>
    </ HScrollView>
  )
})

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