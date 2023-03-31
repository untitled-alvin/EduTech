import React, { useState } from "react"
import { getVariableValue, useTheme } from "tamagui"
import { EduTabBar } from "../../../../components"
import { translate } from "../../../../i18n"
import { AppStackScreenProps } from "../../../../navigators"
import { MoreCircleIcon } from "../../../../utils/useHeader"
import { SceneMap } from "react-native-tab-view"
import { useWindowDimensions } from "react-native"
import { CollapsibleHeaderTabView } from "react-native-tab-view-collapsible-header"
import { MentorInformation } from "./MentorInformation"
import { StudentTab } from "../../../student/components"
import { SourcesMentorTab } from "../../../source/components"
import { ReviewsMentorTab } from "../../../review"
import { useBackHeader } from "../../../../utils/useBackHeader"

const FirstRoute = () => <SourcesMentorTab index={0} />

const SecondRoute = () => <StudentTab index={1} />

const ThirdRoute = () => <ReviewsMentorTab index={2} />

const renderScene = SceneMap({
  courses: FirstRoute,
  students: SecondRoute,
  reviews: ThirdRoute,
});

interface MentorProfileScreenProps extends AppStackScreenProps<"MentorProfile"> { }

export const MentorProfileScreen = (props: MentorProfileScreenProps) => {
  const { navigation } = props
  const theme = useTheme()
  const background = getVariableValue(theme["$background"])
  const [index, setIndex] = useState(0)
  const layout = useWindowDimensions();
  const [routes] = useState([
    { key: 'courses', title: `${translate("common.courses")}` },
    { key: 'students', title: `${translate("common.students")}` },
    { key: 'reviews', title: `${translate("common.reviews")}` },
  ]);

  useBackHeader({
    RightActionComponent: <MoreCircleIcon />,
    onRightPress: () => { },
  })

  return (
    <CollapsibleHeaderTabView
      lazy
      enableSnap
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={(props) => <EduTabBar {...props} />}
      sceneContainerStyle={{ backgroundColor: background }}
      style={{ backgroundColor: background }}
      pagerStyle={{ backgroundColor: background }}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderScrollHeader={() => <MentorInformation h="$85" />}
    />
  )
}
