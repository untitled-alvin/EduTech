import React, { useState } from "react"
import { YStack } from "tamagui"
import { EduTabBar, } from "../../../../components"
import { translate } from "../../../../i18n"
import { AppStackScreenProps } from "../../../../navigators"
import { ArrowLeftIcon, MoreCircleIcon, useHeader } from "../../../../utils/useHeader"
import { SceneMap } from "react-native-tab-view"
import { useWindowDimensions } from "react-native"
import { CollapsibleHeaderTabView } from "react-native-tab-view-collapsible-header"
import { MentorInformation } from "./MentorInformation"
import { StudentTab } from "../../../student/components"
import { SourcesMentorTab } from "../../../source/components"
import { ReviewsMentorTab } from "../../../review"

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
  const [index, setIndex] = useState(0)
  const layout = useWindowDimensions();
  const [routes] = useState([
    { key: 'courses', title: `${translate("common.courses")}` },
    { key: 'students', title: `${translate("common.students")}` },
    { key: 'reviews', title: `${translate("common.reviews")}` },
  ]);

  useHeader({
    LeftActionComponent: <ArrowLeftIcon />,
    onLeftPress: () => navigation.goBack(),
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
      sceneContainerStyle={{ backgroundColor: '#fff' }}
      style={{ backgroundColor: '#fff' }}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      // renderScrollHeader={() => <View style={{ height: 200, backgroundColor: 'red' }} />}
      renderScrollHeader={() => <YStack h={320}><MentorInformation /></YStack>}
    />
  )
}
