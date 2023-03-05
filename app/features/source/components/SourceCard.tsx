import React, { useMemo } from "react"
import { colors } from "../../../components/EduUIKit/theme"
import { Avatar, Box, Button, Center, Column, Container, Heading, Icon, IconButton, Image, Row, Spacer, Text, View } from "native-base";
import { AssetsImage, Bookmark, EduBody, EduHeading, EduText, Message, Star, Tag, rnrImages } from "../../../components";
import { observer } from "mobx-react-lite";
import { Source } from "../models/Source";
import { AccessibilityProps, Platform, StyleSheet } from "react-native";
import { translate } from "../../../i18n";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface SourceCardProps {
  source: Source,
  bookmarked: boolean
  onPress?: () => void
  onPressBookmark: () => void
}

export const SourceCard = observer(function SourceCard(props: SourceCardProps) {
  const { source, bookmarked, onPress, onPressBookmark } = props

  const liked = useSharedValue(bookmarked ? 1 : 0)

  const imageUri = useMemo(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

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

  const ButtonLeftAccessory = useMemo(() =>
    function ButtonLeftAccessory() {
      return (
        <View>
          <Animated.View style={[StyleSheet.absoluteFill, animatedLikeButtonStyles]}  >
            <Icon color="primary.500" as={<Bookmark set="light" size="medium" />} />
          </Animated.View>
          <Animated.View style={[animatedUnlikeButtonStyles]}>
            <Icon color="primary.500" as={<Bookmark set="bold" size="medium" />} />
          </Animated.View>
        </View>
      )
    }, [liked],
  )


  const handlePressBookmark = () => {
    onPressBookmark()
    liked.value = withSpring(liked.value ? 0 : 1)
  }

  return (
    <Box
      // height="40"
      // height="48"
      minHeight='40'
      maxHeight="48"
      backgroundColor='white'
      borderRadius="3xl"
      // style={{
      //   shadowColor: "#000000",
      //   shadowOffset: {
      //     width: 0,
      //     height: 9,
      //   },
      //   shadowOpacity: 0.22,
      //   shadowRadius: 10.24,
      //   // elevation: 13
      //   elevation: 3,
      // }}

      // style={{
      //   shadowColor: "#000",
      //   shadowOffset: {
      //     width: 0,
      //     height: 4,
      //   },
      //   shadowOpacity: 0.05,
      //   shadowRadius: 60,
      //   elevation: 3,
      // }}

      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.06,
        shadowRadius: 60,
        elevation: 2,
      }}
    >

      <Button
        padding="0"
        // padding="5"
        // paddingRight="0"
        flex='1'
        // height="48"
        // maxHeight="48"
        borderRadius="3xl"
        colorScheme="blue"
        variant="ghost"
        onPress={onPress}
        onLongPress={handlePressBookmark}
        {...accessibilityHintProps}
      >
        <Row
          width="full"
          // alignSelf="stretch"
          // justifyContent="flex-start"
          // justifyContent="space-evenly"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Avatar
            margin='5'
            marginRight='4'
            // size={{ base: "40", sm: "32" }}
            maxH="40"
            maxW="40"
            size={{ base: "32", sm: "20", lg: '40' }}
            // flex="1"
            borderRadius="xl"
            source={imageUri}
          />
          <Column
            h="full"
            paddingRight='3'
            paddingTop='4'
            paddingBottom='5'
            flex="1"
            justifyContent="space-between"
          // backgroundColor="primary.100"
          >
            <Row justifyContent="space-between" alignItems="center"  >
              <Tag text=" 3D Design" />

              <IconButton
                // padding="0"
                borderRadius="full"
                onPress={handlePressBookmark}
                onLongPress={handlePressBookmark}
                // icon={
                //   bookmarked ?
                //     <Icon color="primary.500" as={<Bookmark set="bold" size="medium" />} /> :
                //     <Icon color="primary.500" as={<Bookmark set="light" size="medium" />} />
                // }
                accessibilityLabel={
                  bookmarked
                    ? translate("demoPodcastListScreen.accessibility.unfavoriteIcon")
                    : translate("demoPodcastListScreen.accessibility.favoriteIcon")
                }
                icon={<ButtonLeftAccessory />}
              />

            </Row>

            <EduHeading preset="h6" numberOfLines={2} text={`${source.title}`} />

            <Row alignContent="center" alignItems="center" >
              <EduHeading
                preset="h6"
                maxW="60%"
                numberOfLines={1}
                color="primary.500"
                accessibilityLabel={`${source.parsedTitleAndSubtitle.subtitle}}`}
                text={`$25`}
              />

              <Box width="2" />

              <EduBody
                sizeT="small"
                numberOfLines={1}
                color="greyScale.700"
                flex="1"
                strikeThrough
                accessibilityLabel={`${source.parsedTitleAndSubtitle.subtitle}}`}
                text={`$2500`}
              />
              <Box width="2" />
            </Row>

            <Row alignContent="center" alignItems="center">
              <Icon
                as={<Star set="bulk" size="small" />}
                alignSelf="center"
                color="#FB9400"
              />
              <Box width="2" />
              <EduBody
                sizeT="small"
                numberOfLines={1}
                color="greyScale.700"
                accessibilityLabel={`${source.parsedTitleAndSubtitle.subtitle}}`}
                text={`4.9  |  15,827 students`}
              />
            </Row>
          </Column>
        </Row>
      </Button>
    </Box>
  )
})
