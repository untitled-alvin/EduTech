import React, { FC, useEffect, useMemo } from "react"
import { FlatList, } from "react-native"
import { Heading, HeadingProps, LinkButton, Screen } from "../../components"
import { HomeTabScreenProps } from "../../navigators/HomeNavigator"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { MentorsPreview } from "../mentor"
import { WelcomeUserHeader } from "../auth"
import { OfferSlider } from "../offer"
import { CoursesPreview } from "../course/components"
import { XStack, YStack } from "tamagui"

export const HomeScreen: FC<HomeTabScreenProps<"Home">> = observer((props) => {
  const { navigation } = props
  const { authenticationStore } = useStores()

  useEffect(() => {
    if (!authenticationStore.user?.valid) {
      // navigation.push("FillProfile")
    }
  }, [])

  const TopMentors = useMemo(() => () => <MentorsPreview />, [])

  const PopularCourse = useMemo(() => () => <CoursesPreview />, [])

  const renderItem = ({ index }) => {
    if (index === 0) return <OfferSlider />

    return (
      <YStack jc="flex-start" space="$4">
        <Section tx="mentor.topMentors" onPress={() => navigation.push("MentorList")} />
        <TopMentors />
        <Section tx="course.mostPopularCourses" onPress={() => navigation.push("CourseList")} />
        <PopularCourse />
      </YStack>
    )
  }

  return (
    <Screen safeAreaEdges={["top", "bottom", "left", "right"]} >
      <WelcomeUserHeader />
      <FlatList
        data={[1, 2]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Screen >
  )
})

const Section = ({ onPress, ...rest }: { onPress?: () => void } & HeadingProps) => {
  return (
    <XStack paddingHorizontal="$6" ai="center" jc="space-between">
      <Heading preset="h5" {...rest} />
      <LinkButton text="See All" onPress={onPress} />
    </XStack>
  )
}
