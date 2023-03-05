import { observer } from "mobx-react-lite"
import { Box, Button, Column, Avatar, IBoxProps } from "native-base"
import React, { FC, useCallback, useMemo } from "react"
import {
  AccessibilityProps,
  ActivityIndicator,
  FlatList,
  Platform,
  ViewStyle,
} from "react-native"
import { EduBody, rnrImages } from "../../../components"
import { translate } from "../../../i18n"
import { Mentor } from "../models/Mentor"
import { navigate } from "../../../navigators"
import { useMentorPagination } from "../useMentorPagination"

interface MentorsPreviewProps extends IBoxProps { }

export const MentorsPreview: FC<MentorsPreviewProps> = observer(
  function MentorsListScreen(_props) {
    const [
      { mentors, isLoading, isRefreshing },
      { fetchMentors }
    ] = useMentorPagination()

    const ListEmptyComponent = useMemo(() => function ListEmptyComponent() {
      return isLoading ? (
        <ActivityIndicator />
      ) : (
        <EduBody tx="emptyStateComponent.generic.heading" />
      )
    }, [isLoading])

    const renderItem = useCallback(({ index, item }) => {
      return (
        <MentorCard
          key={item.guid}
          onPress={() => navigate("MentorProfile")}
          mentor={item}
        />
      )
    }, [])

    return (
      <FlatList<Mentor>
        data={mentors}
        extraData={mentors.length}
        ItemSeparatorComponent={() => <Box width="4" />}
        contentContainerStyle={$contentContainerStyle}
        // refreshing={refreshing}
        horizontal
        // onRefresh={fetchMentors}
        ListEmptyComponent={<ListEmptyComponent />}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    )
  },
)

const MentorCard = function MentorCard({ mentor, onPress }: { mentor: Mentor, onPress: () => void }) {

  const imageUri = useMemo(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */
  const accessibilityHintProps = useMemo(
    () =>
      Platform.select<AccessibilityProps>({
        ios: {
          accessibilityLabel: mentor.name,
          accessibilityHint: translate("demoPodcastListScreen.accessibility.cardHint"),
        },
        android: {
          accessibilityLabel: mentor.name,
        },
      }),
    [mentor],
  )

  return (
    <Button
      // minHeight="20"
      padding="0"
      // padding="4"
      height="32"
      // width="32"
      width="20"
      maxHeight="32"
      minHeight="20"
      // backgroundColor="blue"
      backgroundColor="white"
      // colorScheme="blue"
      variant="ghost"
      borderRadius="none"
      // borderRadius="full"
      onPress={onPress}
      {...accessibilityHintProps}
    >
      <Column justifyContent="space-evenly" alignItems="center" >
        <Avatar size="lg" source={imageUri} />
        <Box height="2" />
        <EduBody
          sizeT="large"
          type="semibold"
          paddingRight="1"
          paddingLeft="1"
          numberOfLines={2}
          textAlign="center"
          color={"greyScale.900"}>
          {`${mentor.author}`}
        </EduBody>
      </Column>
    </Button>
  )
}

const $contentContainerStyle: ViewStyle = {
  paddingHorizontal: 24,
}

