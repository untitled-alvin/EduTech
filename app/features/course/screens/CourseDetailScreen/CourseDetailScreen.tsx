import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { YStack } from "tamagui"
import { BottomNavigator, Button, EduShadow, EmptyState, Screen } from "../../../../components"
import { translate } from "../../../../i18n"
import { AppStackScreenProps } from "../../../../navigators"
import { CourseDetailBody } from "./CourseDetailBody"
import { useStores } from "../../../../models"

interface CourseDetailScreenProps extends AppStackScreenProps<"CourseDetail"> { }

export const CourseDetailScreen: FC<CourseDetailScreenProps> = observer(props => {
  const { route: { params }, navigation } = props
  // const {
  //   name,
  //   category,
  //   original_price,
  //   promotion_price,
  //   country,
  //   duration,
  //   certificate,
  //   intro,
  //   banner,
  //   id,
  // } = params

  const { paymentStore } = useStores()
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    // console.log(params)
  }, [])


  // useEffect(() => {
  //   load()
  // }, [])

  const load = async () => {
    setIsLoading(true)
    await paymentStore.fetchPayments()
    setIsLoading(false)
  }

  const manualRefresh = async () => {
    setRefreshing(true)
    await paymentStore.fetchPayments()
    setRefreshing(false)
  }


  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      {params ? (
        <YStack w="$full" h="$full" >
          <CourseDetailBody course={params} />
          <BottomNavigator
            borderColor="$divider"
            paddingTop="$6"
            paddingHorizontal="$6"
            borderWidth={1}
            borderBottomWidth={0}
            borderTopLeftRadius="$6"
            borderTopRightRadius="$6"
            position="relative"
          >
            <EduShadow preset="button_1">
              <Button text={`${translate("course.enrollCourse")} - $40`}
                onPress={() => navigation.push("CourseEnroll")}
              />
            </EduShadow>
          </BottomNavigator >
        </YStack >
      ) : <EmptyState />}
    </Screen>
  )
})
