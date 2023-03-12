import { observer } from "mobx-react-lite"
import { Box } from "native-base"
import React, { FC } from "react"
import {
  BottomNavigator,
  EduButton,
  Screen
} from "../../../../components"
import { translate } from "../../../../i18n"
import { AppStackScreenProps } from "../../../../navigators"
import { SourceDetailBody } from "./SourceDetailBody"

interface SourceDetailScreenProps extends AppStackScreenProps<"SourceDetail"> { }

export const SourceDetailScreen: FC<SourceDetailScreenProps> = observer(_props => {
  const { navigation } = _props

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      <Box width={"full"} height={"full"} >
        <SourceDetailBody />
        <BottomNavigator
          paddingTop="6"
          paddingRight="6"
          paddingLeft="6"
          borderWidth="1"
          borderTopRadius="3xl"
          position={"relative"}
          borderColor="greyScale.100"
          backgroundColor="white">
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
