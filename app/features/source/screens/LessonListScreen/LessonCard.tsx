import React from "react"
import { Box, IBoxProps, Icon, } from "native-base";
import { EduHeading, EduShadow, ListTile, Lock, Play } from "../../../../components";
import { AccessibilityProps, Platform } from "react-native";

interface LessonCardProps extends IBoxProps {
  title?: string,
  duration?: string,
  number?: string,
  locked?: boolean,
  onPress?: () => void,
}

export const LessonCard = function LessonCard(props: LessonCardProps) {
  const {
    title = "Why Using Figma",
    duration = "10 mins",
    number = "01",
    locked = false,
    onPress,
    ...rest
  } = props

  const Leading = () => {
    return (
      <Box size="10"
        borderRadius="full"
        backgroundColor="rgba(51, 94, 247, 0.08)"
        justifyContent="center">
        <EduHeading
          preset="h6"
          textAlign="center"
          color="primary.500"
          numberOfLines={1}
          text={number}
        />
      </Box>
    )
  }

  const Trailing = () => {
    return locked
      ? <Icon as={<Lock set="curved" />} color="greyscale.500" />
      : <Icon as={<Play set="bold" />} color="primary.500" />
  }

  return (
    <EduShadow preset="card_2">
      <Box height="20" backgroundColor="white" borderRadius="2xl"  {...rest}>
        <ListTile
          paddingLeft="4"
          paddingRight="4"
          borderRadius="2xl"
          Leading={<Leading />}
          subtitle={{ text: duration }}
          title={{ text: title }}
          Trailing={<Trailing />}
          onPress={onPress}
          {...Platform.select<AccessibilityProps>({
            ios: { accessibilityLabel: title },
            android: { accessibilityLabel: title },
          })}
        />
      </Box >
    </EduShadow>
  )
}
