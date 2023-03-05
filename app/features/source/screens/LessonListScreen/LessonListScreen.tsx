import { observer } from "mobx-react-lite"
import { Box, Icon } from "native-base"
import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
} from "react-native"
import { BottomNavigator, EmptyState, MoreCircle, Screen, EduButton } from "../../../../components"
import { isRTL, translate } from "../../../../i18n"
import { AppStackScreenProps } from "../../../../navigators"
import { useHeader } from "../../../../utils/useHeader"
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview"
import { delay } from "../../../../utils/delay"
import { LessonSection } from "./LessonSection"


//Adjustment for margin given to RLV;
const windowWidth = Math.round(Dimensions.get("window").width * 1000) / 1000 - 6;
export const lessonData = [
  {
    section: { text: "Section 1 - Introduction", duration: "15 mins" },
    data: [1, 2, 3]
  },
  {
    section: { text: "Section 2 - Figma Basic", duration: "60 mins" },
    data: [4, 5, 6, 7, 8, 9]
  },
  {
    section: { text: "Section 3 - Let's Practice", duration: "75 mins" },
    data: [10, 11, 12]
  },
  {
    section: { text: "Section 4 - Let's Practice", duration: "75 mins" },
    data: [13, 14]
  },
  {
    section: { text: "Section 5 - Let's Practice", duration: "75 mins" },
    data: [15]
  },
]

interface LessonListScreenProps extends AppStackScreenProps<"LessonList"> { }

export const LessonListScreen: FC<LessonListScreenProps> = observer(_props => {
  const { navigation } = _props
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const layoutProvider = useMemo(() => new LayoutProvider(
    (index) => {
      return index
    }, (index, dim) => {
      const rowData = lessonData[index].data
      const length = rowData.length
      dim.width = windowWidth
      // dim.height = 500
      dim.height = length * 100 + 60
    }), []
  )

  const rowRenderer = useCallback((type, item, index) => {
    const { section, data } = item

    return (
      <LessonSection
        key={index}
        title={section?.text}
        duration={section?.duration}
        lessons={data}
      />
    )
  }, [])

  const renderFooter = useCallback(() => {
    if (isLoading) return <ActivityIndicator />

    if (!lessonData.length) {
      return (<EmptyState
        preset="generic"
        style={{ marginTop: 48 }}
        buttonOnPress={manualRefresh}
        imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
        ImageProps={{ resizeMode: "contain" }}
      />)
    }

    return <Box />
  }, [])

  useEffect(() => {
    load()
  }, [])

  useHeader({
    leftIcon: "arrowLeft",
    titleTx: "common.lessons",
    onLeftPress: () => navigation.goBack(),
    RightActionComponent: (
      <Icon marginLeft="4" marginRight="4"
        as={<MoreCircle set="light" />}
        color="greyScale.900" />),
    onRightPress: () => { },
  })

  async function load() {
    setIsLoading(true)
    await Promise.all([delay(700)])
    setIsLoading(false)
  }

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([delay(700)])
    setRefreshing(false)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      <Box width={"full"} height={"full"}>
        <RecyclerListView
          style={{ flex: 1 }}
          scrollViewProps={{
            style: { paddingTop: 24 },
            showsVerticalScrollIndicator: false,
            // ItemSeparatorComponent: <Box height="2" />,
            refreshControl: (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={manualRefresh}
              />
            )
          }}
          renderFooter={renderFooter}
          rowRenderer={rowRenderer}
          dataProvider={new DataProvider((r1, r2) => {
            return r1 !== r2
          }).cloneWithRows(lessonData)}
          layoutProvider={layoutProvider}
        />
        <BottomNavigator
          paddingTop="6"
          paddingRight="6"
          paddingLeft="6"
          borderWidth="1"
          borderTopRadius="3xl"
          position={"relative"}
          borderColor="greyScale.100"
          backgroundColor="white"
        >
          <EduButton
            displayShadow
            text={`${translate("source.enrollCourse")} - $40`}
            onPress={() => navigation.push("EnrollSource")}
          />
        </BottomNavigator >
      </Box>
    </Screen>
  )
})
