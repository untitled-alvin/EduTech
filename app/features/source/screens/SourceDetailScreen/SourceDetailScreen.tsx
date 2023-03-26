import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { YStack } from "tamagui"
import { BottomNavigator, EduButton, EduShadow, Screen } from "../../../../components"
import { translate } from "../../../../i18n"
import { AppStackScreenProps } from "../../../../navigators"
import { SourceDetailBody } from "./SourceDetailBody"

interface SourceDetailScreenProps extends AppStackScreenProps<"SourceDetail"> { }

export const SourceDetailScreen: FC<SourceDetailScreenProps> = observer(_props => {
  const { navigation } = _props

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      <YStack w="$full" h="$full" >
        <SourceDetailBody />
        <BottomNavigator
          paddingTop="$6"
          paddingHorizontal="$6"
          borderWidth={1}
          borderBottomWidth={0}
          borderTopLeftRadius="$6"
          borderTopRightRadius="$6"
          position="relative"
          borderColor="$greyscale100">

          <EduShadow preset="button_1">
            <EduButton text={`${translate("source.enrollCourse")} - $40`}
              onPress={() => navigation.push("EnrollSource")}
            />
          </EduShadow>
        </BottomNavigator >
      </YStack >
    </Screen>
  )
})
