import React from "react"
import { colors, EduHeading, EduShadow, ListTile, ListTileProps, Lock, Play } from "../../../../components";
import { AccessibilityProps, Platform } from "react-native";
import { Button } from "tamagui";

type LessonCardProps = ListTileProps & {
  name?: string,
  duration?: string,
  number?: string,
  locked?: boolean,
}

export const LessonCard = function LessonCard(props: LessonCardProps) {
  const {
    name = "Why Using Figma",
    duration = "10 mins",
    number = "01",
    locked = false,
    ...rest
  } = props

  const Leading = () => {
    return (
      <Button
        disabled
        size={44}
        borderRadius="$10"
        backgroundColor="rgba(51, 94, 247, 0.08)"
        justifyContent="center">
        <EduHeading
          preset="h6"
          textAlign="center"
          color="$primary500"
          numberOfLines={1}
          text={number}
        />
      </Button>
    )
  }

  const Trailing = () => {
    return locked
      ? <Lock set="curved" color={colors.greyscale[500]} />
      : <Play set="bold" color={colors.primary[500]} />
  }

  return (
    <EduShadow preset="card_2">
      <ListTile h="$20" br="$4" paddingHorizontal="$4"
        Leading={<Leading />}
        title={{ text: name }}
        subtitle={{ text: duration }}
        Trailing={<Trailing />}
        {...Platform.select<AccessibilityProps>({
          ios: { accessibilityLabel: name },
          android: { accessibilityLabel: name },
        })}
        {...rest}
      />
    </EduShadow>
  )
}
