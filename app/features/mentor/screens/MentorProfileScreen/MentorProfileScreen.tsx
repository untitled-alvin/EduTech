import { Box, Icon } from "native-base"
import React, { FC, useState } from "react"
import {
  EduTabBar, MoreCircle,
} from "../../../../components"
import { translate } from "../../../../i18n"
import { AppStackScreenProps } from "../../../../navigators"
import { useHeader } from "../../../../utils/useHeader"
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

export const MentorProfileScreen: FC<MentorProfileScreenProps> = props => {
  const { navigation } = props
  const [index, setIndex] = useState(0)
  const layout = useWindowDimensions();
  const [routes] = useState([
    { key: 'courses', title: `${translate("common.courses")}` },
    { key: 'students', title: `${translate("common.students")}` },
    { key: 'reviews', title: `${translate("common.reviews")}` },
  ]);

  useHeader({
    leftIcon: "arrowLeft",
    onLeftPress: () => navigation.goBack(),
    RightActionComponent: (
      <Icon marginLeft="4" marginRight="4"
        as={<MoreCircle set="light" />}
        color="greyScale.900" />),
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
      renderScrollHeader={() => <Box height={320}><MentorInformation /></Box>}
    />
  )
}
