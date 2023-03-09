import { observer } from "mobx-react-lite"
import { Avatar } from "native-base"
import React, { FC, useCallback, useEffect, useMemo } from "react"
import {
  AccessibilityProps,
  ActivityIndicator,
  FlatList,
  Platform,
} from "react-native"
import { EmptyState, Screen, ListTile, rnrImages } from "../../../../components"
import { isRTL, translate } from "../../../../i18n"
import { useStores } from "../../../../models"
import { Mentor } from "../../models/Mentor"
import { AppStackScreenProps } from "../../../../navigators"
import { delay } from "../../../../utils/delay"
import { useHeader } from "../../../../utils/useHeader"

interface MentorListScreenProps extends AppStackScreenProps<"MentorList"> { }

export const MentorListScreen: FC<MentorListScreenProps> = observer(function MentorsListScreen(_props) {
  const { navigation } = _props
  const { mentorStore } = useStores()
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const renderItem = useCallback(({ item, index }) => {
    const mentor = mentorStore.mentorsForList[index]

    return <MentorListTile key={mentor.guid}
      mentor={mentor}
      onPress={() => navigation.push("MentorProfile")}
    />
  }, [])

  useHeader({
    leftIcon: "arrowLeft",
    onLeftPress: () => navigation.goBack(),
    titleTx: "topMentorsScreen.topMentors"
  })

  // initially, kick off a background refresh without the refreshing UI
  useEffect(() => {
    (async function load() {
      setIsLoading(true)
      await mentorStore.fetchMentors()
      setIsLoading(false)
    })()
  }, [mentorStore])

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([mentorStore.fetchMentors(), delay(750)])
    setRefreshing(false)
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right"]}>
      <FlatList<Mentor>
        data={mentorStore.mentorsForList}
        extraData={mentorStore.favorites.length + mentorStore.mentors.length}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        renderItem={renderItem}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={{ marginTop: 48 }}
              buttonOnPress={manualRefresh}
              imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
      />
    </Screen>
  )
})

interface MentorListTileProps {
  mentor: Mentor
  onPress?: () => void,
}

const MentorListTile = function MentorListTile(props: MentorListTileProps) {
  const { mentor, onPress } = props
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
          accessibilityActions: [
            {
              name: "longpress",
              label: translate("demoPodcastListScreen.accessibility.favoriteAction"),
            },
          ],
          onAccessibilityAction: ({ nativeEvent }) => {
            if (nativeEvent.actionName === "longpress") {
            }
          },
        },
      }),
    [mentor],
  )

  return (
    <ListTile
      Leading={<Avatar size={"lg"} source={imageUri} />}
      title={{ text: `${mentor.author}` }}
      subtitle={{ text: `${mentor.author}` }}
      // subtitle={{ text: `${mentor.parsedTitleAndSubtitle.subtitle}` }}
      onPress={onPress}
      {...accessibilityHintProps}
    />
  )
}
