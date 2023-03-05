import React, { FC, useEffect, useMemo, useState } from "react"
import { FlatList, } from "react-native"
import { EduHeading, LinkButton, Screen, } from "../../components"
import { translate } from "../../i18n"
import { HomeTabScreenProps } from "../../navigators/HomeNavigator"
import { observer } from "mobx-react-lite"
import { Box, Column, Row, } from "native-base"
import { useStores } from "../../models"
import { MentorsPreview } from "../mentor"
import { WelcomeUserHeader } from "../auth"
import { CategorySelect } from "../category"
import { OfferSlider } from "../offer"
import { SourcesPreview } from "../source"

export const HomeScreen: FC<HomeTabScreenProps<"Home">> = observer(function HomeScreen(_props) {
  const { navigation } = _props
  const { authenticationStore, sourceStore } = useStores()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async function load() {
      setIsLoading(true)
      sourceStore.init()
      await sourceStore.refresh()
      // await sourceStore.fetchSources()
      setIsLoading(false)
    })()
  }, [sourceStore])

  useEffect(() => {
    if (!authenticationStore.user?.valid) {
      navigation.push("FillProfile")
    }
  }, [])

  const ListCategory = useMemo(() => function ListCategory() {
    return (
      <Box marginTop='4' backgroundColor='white'  >
        <CategorySelect onChanged={(value) => {
        }} />
      </Box>
    )
  }, [])

  const TopMentors = useMemo(
    () => function TopMentors() {
      return <MentorsPreview />
    }, []
  )

  const PopularSource = useMemo(
    () => function PopularSource() {
      return <SourcesPreview />
    }, []
  )

  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom", "left", "right"]} >
      <WelcomeUserHeader />
      <FlatList
        data={[1, 2]}
        showsVerticalScrollIndicator={false}
        // style={{ height: "100%", backgroundColor: "transparent" }}
        // onRefresh={manualRefresh}
        // ItemSeparatorComponent={() => <Box />}
        // contentContainerStyle={$contentContainerStyle}
        renderItem={({ index }) => {
          if (index === 0) return <OfferSlider key={index} />

          return (
            <Column key={index} flex={1} justifyContent={"flex-start"}>
              {/* <Box height='4' /> */}
              <SHeading title={translate("topMentorsScreen.topMentors")}
                onPress={() => navigation.push("MentorList")} />
              <Box height='4' />
              <TopMentors />
              <Box height='4' />
              <SHeading title={translate("source.mostPopularCourses")}
                onPress={() => navigation.push("SourceList")} />
              <Box height='4' />
              <ListCategory />
              <Box height='4' />
              <PopularSource />
              <Box height='10' />
              <Box height='10' />
            </Column>
          )
        }}
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

