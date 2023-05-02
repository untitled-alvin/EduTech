import React, { useMemo } from "react"
import { observer } from "mobx-react-lite";
import { AccessibilityProps, Platform, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue, withSpring
} from "react-native-reanimated";
import { styled, Avatar, Button, ButtonProps, Theme, XStack, YStack } from "tamagui";
import { translate } from "../../../i18n";
import { Course } from "../models/Course";
import {
  Bookmark,
  Body,
  Heading,
  Star,
  Tag,
  EduShadow,
  IconButton,
  courseImages,
  IconSVG,
} from "../../../components";

const Frame = styled(Button, { p: "$none", h: "$40", mih: "$40", mah: "$48", br: "$8" })

interface CourseCardProps extends ButtonProps {
  course: Course,
  bookmarked: boolean
  onPressBookmark: () => void
}

export const CourseCard = observer((props: CourseCardProps) => {
  const { course, bookmarked, onPressBookmark, ...rest } = props

  const name = course.name ?? "N/A"
  const promotionPrice = course.promotion_price
  const originalPrice = course.original_price
  const category = course.category ?? "N/A"
  const rate = `4,9  |  15,827 ${translate("common.students").toLowerCase()}`

  const liked = useSharedValue(bookmarked ? 1 : 0)
  const imageUri = useMemo(() => {
    return courseImages[Math.floor(Math.random() * courseImages.length)]
  }, [])

  // const lastId = useRef(id)
  // if (id !== lastId.current) {
  //   lastId.current = id;
  //   liked.value = withSpring(bookmarked ? 1 : 0)
  // }

  const handlePressBookmark = () => {
    onPressBookmark()
    liked.value = withSpring(liked.value ? 0 : 1)
  }

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
      opacity: liked.value,
      transform: [{ scale: liked.value }],
    }
  })

  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */
  const accessibilityHintProps = useMemo(
    () => Platform.select<AccessibilityProps>({
      ios: {
        accessibilityLabel: name,
        accessibilityHint: translate("demoPodcastListScreen.accessibility.cardHint", {
          action: bookmarked ? "unBookmark" : "bookmark",
        }),
      },
      android: {
        accessibilityLabel: name,
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
    }), [course, bookmarked]
  )

  const ButtonLeftAccessory = useMemo(() => () => (
    <View>
      <Animated.View style={[StyleSheet.absoluteFill, animatedLikeButtonStyles]}  >
        <IconSVG color="$primary500" as={<Bookmark set="light" />} />
      </Animated.View>
      <Animated.View style={[animatedUnlikeButtonStyles]}>
        <IconSVG color="$primary500" as={<Bookmark set="bold" />} />
      </Animated.View>
    </View>
  ), [liked])

  // onLongPress={handlePressBookmark}
  return (
    <EduShadow preset="card_2">
      <Theme name="ListTile">
        <Frame {...accessibilityHintProps} {...rest}>
          <XStack w="$full" jc="space-evenly" ai="center">
            <Avatar margin="$5" mr="$4" size="$30" borderRadius={20}  >
              <Avatar.Image src={imageUri} />
            </Avatar>
            <YStack h="$full" pt="$3" pb="$4" flex={1} jc="space-between">
              <XStack jc="space-between" ai="center">
                <Tag text={category} />
                <IconButton
                  // size="$10"
                  bg="$transparent"
                  onPress={handlePressBookmark}
                  accessibilityLabel={
                    bookmarked
                      ? translate("demoPodcastListScreen.accessibility.unfavoriteIcon")
                      : translate("demoPodcastListScreen.accessibility.favoriteIcon")
                  }
                  icon={<ButtonLeftAccessory />}
                />
              </XStack>

              <Heading preset="h6" pr="$3" numberOfLines={2} text={name} />

              <XStack ac="center" ai="center" space="$2" >
                {promotionPrice && (
                  <Heading
                    preset="h6"
                    maxWidth="60%"
                    numberOfLines={1}
                    color="$primary500"
                    text={`$${promotionPrice}`}
                  />
                )}

                {originalPrice && (
                  <Body
                    flex={1}
                    size="small"
                    numberOfLines={1}
                    color="$greyscale700"
                    textDecorationLine="line-through"
                    text={`$${originalPrice}`}
                  />
                )}
              </XStack>

              <XStack ac="center" ai="flex-end" space="$2">
                <Star set="bulk" size="small" color="#FB9400" />
                <Body size="small" numberOfLines={1} color="$greyscale700" text={rate} />
              </XStack>
            </YStack>
          </XStack>
        </Frame>
      </Theme>
    </EduShadow>
  )
})
