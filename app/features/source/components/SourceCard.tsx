import React, { useMemo, useRef } from "react"
import { observer } from "mobx-react-lite";
import { AccessibilityProps, Platform, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate, interpolate, useAnimatedStyle,
  useSharedValue, withSpring
} from "react-native-reanimated";
import { Avatar, Button, ButtonProps, XStack, YStack } from "tamagui";
import { translate } from "../../../i18n";
import { Source } from "../models/Source";
import { Bookmark, EduBody, EduHeading, Star, EduTag, EduShadow, IconSVG, IconButton, rnrImages, } from "../../../components";

interface SourceCardProps extends ButtonProps {
  source: Source,
  bookmarked: boolean
  onPressBookmark: () => void
}

export const SourceCard = observer((props: SourceCardProps) => {
  const { source, bookmarked, onPressBookmark, ...rest } = props
  const liked = useSharedValue(bookmarked ? 1 : 0)
  const imageUri = useMemo(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  // const lastId = useRef(source.id)
  // if (source.id !== lastId.current) {
  //   lastId.current = source.id;
  //   liked.value = withSpring(bookmarked ? 1 : 0)
  // }

  // Grey heart
  const animatedLikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.EXTEND),
        },
      ],
      opacity: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    }
  })

  // Pink heart
  const animatedUnlikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
      opacity: liked.value,
    }
  })

  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */
  const accessibilityHintProps = useMemo(
    () =>
      Platform.select<AccessibilityProps>({
        ios: {
          accessibilityLabel: source.title,
          accessibilityHint: translate("demoPodcastListScreen.accessibility.cardHint", {
            action: bookmarked ? "unBookmark" : "bookmark",
          }),
        },
        android: {
          accessibilityLabel: source.title,
          accessibilityActions: [
            {
              name: "longpress",
              label: translate("demoPodcastListScreen.accessibility.favoriteAction"),
            },
          ],
          onAccessibilityAction: ({ nativeEvent }) => {
            if (nativeEvent.actionName === "longpress") {
              handlePressBookmark()
            }
          },
        },
      }),
    [source, bookmarked],
  )

  const ButtonLeftAccessory = useMemo(() => () => {
    return (
      <View>
        <Animated.View style={[StyleSheet.absoluteFill, animatedLikeButtonStyles]}  >
          <IconSVG color="$primary500" as={<Bookmark set="light" />} />
        </Animated.View>
        <Animated.View style={[animatedUnlikeButtonStyles]}>
          <IconSVG color="$primary500" as={<Bookmark set="bold" />} />
        </Animated.View>
      </View>
    )
  }, [liked])

  const handlePressBookmark = () => {
    onPressBookmark()
    liked.value = withSpring(liked.value ? 0 : 1)
  }

  return (
    <EduShadow preset="card_2">
      <Button theme="list_tile" p="$none" h="$40" mih="$40" mah="$48" br="$8"
        // onLongPress={handlePressBookmark}
        {...accessibilityHintProps}
        {...rest}
      >
        <XStack w="$full" jc="space-evenly" ai="center">
          <Avatar margin="$5" mr="$4" size="$30" borderRadius={20}  >
            <Avatar.Image src={imageUri} />
          </Avatar>
          <YStack h="$full" pr="$3" pt="$3" pb="$4" flex={1} jc="space-between">
            <XStack jc="space-between" ai="center">
              <EduTag text=" 3D Design" />
              <IconButton
                size="$8"
                onPress={handlePressBookmark}
                accessibilityLabel={
                  bookmarked
                    ? translate("demoPodcastListScreen.accessibility.unfavoriteIcon")
                    : translate("demoPodcastListScreen.accessibility.favoriteIcon")
                }
                icon={<ButtonLeftAccessory />}
              />
            </XStack>

            <EduHeading preset="h6" numberOfLines={2} text={`${source.title}`} />

            <XStack ac="center" ai="center" space="$2" >
              <EduHeading
                preset="h6"
                maxWidth="60%"
                numberOfLines={1}
                color="$primary500"
                accessibilityLabel={`${source.parsedTitleAndSubtitle.subtitle}}`}
                text={`$25`}
              />
              <EduBody
                flex={1}
                size="small"
                numberOfLines={1}
                color="$greyscale700"
                textDecorationLine="line-through"
                accessibilityLabel={`${source.parsedTitleAndSubtitle.subtitle}}`}
                text={`$2500`}
              />
            </XStack>

            <XStack ac="center" ai="flex-end" space="$2">
              <Star set="bulk" size="small" color="#FB9400" />
              <EduBody
                size="small"
                numberOfLines={1}
                color="$greyscale700"
                accessibilityLabel={`${source.parsedTitleAndSubtitle.subtitle}}`}
                text={`4.9  |  15,827 students`}
              />
            </XStack>
          </YStack>
        </XStack>
      </Button>
    </EduShadow>
  )
})
