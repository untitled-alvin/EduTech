import { observer } from "mobx-react-lite"
import { Box } from "native-base"
import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { Tabs, } from "react-native-collapsible-tab-view"
import { BottomNavigator, EduButton, Screen } from "../../../../components"
import { translate } from "../../../../i18n"
import { useStores } from "../../../../models"
import { AppStackScreenProps } from "../../../../navigators"
import { LessonsTab } from "../LessonListScreen/LessonsTab"
import { AboutTab } from "./AboutTab"
import { CustomTabBar } from "./CustomTabBar"
import { ReviewsSourceTab } from "../../../review/ReviewsSourceTab"
import { HEADER_HEIGHT, MIN_HEADER_HEIGHT, ScreenHeader } from "./ScreenHeader"

interface SourceDetailScreenProps extends AppStackScreenProps<"SourceDetail"> { }

export const SourceDetailScreen: FC<SourceDetailScreenProps> = observer(_props => {
  const { navigation } = _props
  const { paymentStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [index, setIndex] = useState(0)
  const ref = useRef()

  useEffect(() => {
    load()
  }, [paymentStore])

  async function load() {
    setIsLoading(true)
    await paymentStore.fetchPayments()
    setIsLoading(false)
  }

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await paymentStore.fetchPayments()
    setRefreshing(false)
  }

  const TabBarComponent = useCallback(
    (props) => <CustomTabBar {...props} />, []
  )

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      <Box width={"full"} height={"full"} >
        <Tabs.Container
          ref={ref}
          lazy
          headerContainerStyle={{ elevation: 0, shadowOpacity: 0 }}
          headerHeight={HEADER_HEIGHT}
          renderTabBar={TabBarComponent}
          // snapThreshold={1}
          snapThreshold={0.5}
          minHeaderHeight={MIN_HEADER_HEIGHT}
          renderHeader={(title) => <ScreenHeader />}
        >
          <Tabs.Tab name="about" label={`${translate("common.about")}`}>
            <AboutTab />
          </Tabs.Tab>

          <Tabs.Tab name="lessons" label={`${translate("common.lessons")}`}>
            <LessonsTab />
          </Tabs.Tab>

          <Tabs.Tab name="reviews" label={`${translate("common.reviews")}`}>
            <ReviewsSourceTab />
          </Tabs.Tab>
        </Tabs.Container>

        <BottomNavigator
          paddingTop="6"
          paddingRight="6"
          paddingLeft="6"
          borderWidth="1"
          borderTopRadius="3xl"
          position={"relative"}
          borderColor="greyScale.100"
          backgroundColor="white" >
          <EduButton
            displayShadow
            text={`${translate("source.enrollCourse")} - $40`}
            onPress={() => navigation.push("EnrollSource")}
          />
        </BottomNavigator >
      </Box >
    </Screen>
  )
})
