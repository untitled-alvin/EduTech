import React, { FC, useEffect, useMemo } from "react"
import { FlatList, } from "react-native"
import { EduHeading, LinkButton, Screen, } from "../../components"
import { translate } from "../../i18n"
import { HomeTabScreenProps } from "../../navigators/HomeNavigator"
import { observer } from "mobx-react-lite"
import { Box, Column, Row, } from "native-base"
import { useStores } from "../../models"
import { MentorsPreview } from "../mentor"
import { WelcomeUserHeader } from "../auth"
import { OfferSlider } from "../offer"
import { SourcesPreview } from "../source/components"

export const HomeScreen: FC<HomeTabScreenProps<"Home">> = observer(function HomeScreen(_props) {
  const { navigation } = _props
  const { authenticationStore } = useStores()

  useEffect(() => {
    if (!authenticationStore.user?.valid) {
      navigation.push("FillProfile")
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
      <Column key={index} flex={1} justifyContent={"flex-start"}>
        <SHeading title={translate("topMentorsScreen.topMentors")}
          onPress={() => navigation.push("MentorList")} />
        <Box height='4' />
        <TopMentors />
        <Box height='4' />
        <SHeading title={translate("source.mostPopularCourses")}
          onPress={() => navigation.push("SourceList")} />
        <Box height='4' />
        <PopularSource />
        <Box height='10' />
      </Column>
    )
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom", "left", "right"]} >
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
    <Row paddingRight="6" paddingLeft="6"
      alignItems="center" justifyContent="space-between">
      <EduHeading preset="h5" text={title} />
      <LinkButton text=" See All" onPress={onPress} />
    </Row>
  )
}

