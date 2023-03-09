import React from "react"
import { EduHeading, LinkButton, } from "../../../../components"
import { Box, IBoxProps, Row } from "native-base"
import { ScrollView } from "react-native-collapsible-tab-view"
import { LessonSection } from "./LessonSection"
import { lessonData } from "./LessonListScreen"
import { navigate } from "../../../../navigators"

interface LessonsTabProps extends IBoxProps { }

export function LessonsTab(props: LessonsTabProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}
      accessibilityTraits={undefined} accessibilityComponentType={undefined} >
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
    </ ScrollView>
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