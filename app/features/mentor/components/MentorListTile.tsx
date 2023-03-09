import { Avatar } from "native-base"
import React, { useMemo } from "react"
import { AccessibilityProps, Platform, } from "react-native"
import { ListTile, rnrImages } from "../../../components"
import { translate } from "../../../i18n"
import { Mentor } from "../models"

interface MentorListTileProps {
  mentor: Mentor
  onPress?: () => void,
}

export const MentorListTile = function MentorListTile(props: MentorListTileProps) {
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
