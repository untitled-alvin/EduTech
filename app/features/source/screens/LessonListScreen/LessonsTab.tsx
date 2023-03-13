import React from "react"
import { EduHeading, LinkButton, } from "../../../../components"
import { Box, Row } from "native-base"
import { LessonSection } from "./LessonSection"
import { lessonData } from "./LessonListScreen"
import { navigate } from "../../../../navigators"
import { HScrollView } from "react-native-head-tab-view"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../../models"


interface LessonsTabProps {
  index: number
}

export const LessonsTab = observer((props: LessonsTabProps) => {
  const { sourceDetailStore } = useStores()

  return (
    <HScrollView index={props.index} showsVerticalScrollIndicator={false}  >
      <Box >
        <Row
          marginTop={4}
          marginBottom={4}
          paddingLeft="6"
          paddingRight="6"
          alignItems="center"
          justifyContent="space-between"
        >
          <EduHeading
            preset="h5"
            numberOfLines={1}
            flex={1} text="124 Lessons"
          />
          <LinkButton onPress={() => { navigate("LessonList") }}>
            See All
          </LinkButton>
        </Row>

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
      </Box>
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