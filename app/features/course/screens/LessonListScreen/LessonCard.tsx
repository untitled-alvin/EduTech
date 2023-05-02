import React from "react"
import { Heading, ListTile, EduShadow, ListTileProps, Lock, Play, color } from "../../../../components";
import { AccessibilityProps, Platform } from "react-native";
import { Button } from "tamagui";

type LessonCardProps = ListTileProps & {
  name?: string,
  duration?: number,
  index?: number,
  locked?: boolean,
}

export const LessonCard = (props: LessonCardProps) => {
  const {
    name = "Why Using Figma",
    duration = 10,
    index = 1,
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
        <Heading
          preset="h6"
          textAlign="center"
          color="$primary500"
          numberOfLines={1}
          text={`${('0' + index).slice(-2)}`}
        />
      </Button>
    )
  }

  const Trailing = () => {
    return locked
      ? <Lock set="curved" color={color.greyscale500} />
      : <Play set="bold" color={color.primary500} />
  }

  return (
    <EduShadow preset="card_2">
      <ListTile h="$20" br="$4" paddingHorizontal="$4"
        Leading={<Leading />}
        title={{ text: name }}
        subtitle={{ text: `${duration} mins` }}
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
