import React, { FC, useEffect, useMemo } from "react"
import { FlatList, } from "react-native"
import { EduHeading, EduHeadingProps, LinkButton, Screen } from "../../components"
import { HomeTabScreenProps } from "../../navigators/HomeNavigator"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { MentorsPreview } from "../mentor"
import { WelcomeUserHeader } from "../auth"
import { OfferSlider } from "../offer"
import { SourcesPreview } from "../source/components"
import { XStack, YStack } from "tamagui"

export const HomeScreen: FC<HomeTabScreenProps<"Home">> = observer(function HomeScreen(_props) {
  const { navigation } = _props
  const { authenticationStore } = useStores()
  const TopMentors = useMemo(() => () => <MentorsPreview />, [])
  const PopularSource = useMemo(() => () => <SourcesPreview />, [])

  useEffect(() => {
    if (!authenticationStore.user?.valid) {
      // navigation.push("FillProfile")
    }
  }, [])

  const renderItem = ({ index }) => {
    if (index === 0) return <OfferSlider key={index} />

    return (
      <YStack key={index} jc="flex-start" space="$4">
        <Section tx="topMentorsScreen.topMentors" onPress={() => navigation.push("MentorList")} />
        <TopMentors />
        <Section tx="source.mostPopularCourses" onPress={() => navigation.push("SourceList")} />
        <PopularSource />
      </YStack>
    )
  }

  return (
    <Screen safeAreaEdges={["top", "bottom", "left", "right"]} >
      <WelcomeUserHeader />
      <FlatList
        data={[1, 2]}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Screen >
  )
})

const Section = ({ onPress, ...rest }: { onPress?: () => void } & EduHeadingProps) => {
  return (
    <XStack paddingHorizontal="$6" ai="center" jc="space-between">
      <EduHeading preset="h5" {...rest} />
      <LinkButton text="See All" onPress={onPress} />
    </XStack>
  )
}
