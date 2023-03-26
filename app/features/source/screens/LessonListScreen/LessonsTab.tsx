import React from "react"
import { EduHeading, LinkButton, } from "../../../../components"
import { LessonSection } from "./LessonSection"
import { lessonData } from "./LessonListScreen"
import { navigate } from "../../../../navigators"
import { HScrollView } from "react-native-head-tab-view"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../../models"
import { XStack, YStack } from "tamagui"


type LessonsTabProps = { index: number }

export const LessonsTab = observer((props: LessonsTabProps) => {
  const { sourceDetailStore } = useStores()

  return (
    <HScrollView index={props.index} showsVerticalScrollIndicator={false}  >
      <YStack >
        <XStack marginVertical="$4" paddingHorizontal="$6" ai="center" jc="space-between">
          <EduHeading preset="h5" numberOfLines={1} flex={1} text="124 Lessons" />
          <LinkButton onPress={() => { navigate("LessonList") }}>
            See All
          </LinkButton>
        </XStack>

        {lessonData.map((value, index) => {
          const { section, data } = value
          return (
            <LessonSection
              key={index}
              title={section?.text}
              duration={section?.duration}
              lessons={data}
            />
          )
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