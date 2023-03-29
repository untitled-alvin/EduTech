import React, { FC, useEffect, useMemo } from "react"
import { FlatList, } from "react-native"
import { EduHeading, LinkButton, Screen } from "../../components"
import { translate } from "../../i18n"
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

  useEffect(() => {
    if (!authenticationStore.user?.valid) {
      // navigation.push("FillProfile")
    }
  }, [])

  const TopMentors = useMemo(() => function TopMentors() {
    return <MentorsPreview />
  }, [])

  const PopularSource = useMemo(() => function PopularSource() {
    return <SourcesPreview />
  }, [])

  const renderItem = ({ index }) => {
    if (index === 0) return <OfferSlider key={index} />

    return (
      <YStack key={index} jc="flex-start">
        <SHeading title={translate("topMentorsScreen.topMentors")}
          onPress={() => navigation.push("MentorList")} />
        <YStack height="$4" />
        <TopMentors />
        <YStack height="$4" />
        <SHeading title={translate("source.mostPopularCourses")}
          onPress={() => navigation.push("SourceList")} />
        <YStack height="$4" />
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

function SHeading({ title, onPress }: { title: string, onPress?: () => void }) {
  return (
    <XStack paddingHorizontal="$6" ai="center" jc="space-between">
      {/* <XStack paddingHorizontal="$5" ai="center" jc="space-between"> */}
      <EduHeading preset="h5" text={title} />
      <LinkButton text="See All" onPress={onPress} />
    </XStack>
  )
}
