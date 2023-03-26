import React from "react"
import { EduBody } from "../../../../components"
import { LessonCard } from "./LessonCard"
import { navigate } from "../../../../navigators"
import { XStack, YStack } from "tamagui"

const lock = [true, false]


const data = [
  {
    title: "Set up Your Figma Account",
    duration: "5 mins"
  },
  {
    title: "Set up Your Figma Account",
    duration: "5 mins"
  },
  {
    title: "Take a Look Figma Interface",
    duration: "5 mins"
  },
  {
    title: "Working with Text & Grids",
    duration: "5 mins"
  },
  {
    title: "Using Figma Plugins",
    duration: "5 mins"
  },
  {
    title: "Let's Design a Sign-Up Form",
    duration: "5 mins"
  },
  {
    title: "Let's Create a Prototype",
    duration: "5 mins"
  },
  {
    title: "Sharing Work with Team",
    duration: "5 mins"
  },
  {
    title: "Exporting Assets",
    duration: "5 mins"
  }
]

interface LessonSectionProps {
  title?: string,
  duration?: string,
  lessons?: number[]
}

export function LessonSection(props: LessonSectionProps) {
  const {
    title = "Section 1 - Introduction",
    duration = "15 mins",
    lessons = [],
  } = props

  return (
    <YStack>
      <XStack paddingHorizontal="$6" ai="center" jc="space-between">
        <EduBody
          type="bold"
          sizeT="large"
          text={title}
          color={'$greyscale700'}
          flex={1}
        />
        <EduBody text={duration} sizeT="large" type="bold" color={'$primary500'} />
      </XStack>

      <YStack padding="$6" space="$1">
        {lessons?.map((value, index) => {
          const locked = lock[Math.floor(Math.random() * lock.length)]
          const item = data[Math.floor(Math.random() * data.length)]

          return (
            <LessonCard
              key={index}
              locked={locked}
              number={`${('0' + value).slice(-2)}`}
              name={item.title}
              duration={item.duration}
              onPress={() => navigate("SourcePlay")}
              marginBottom={6}
            />
          )
        }
        )}
      </YStack>
    </YStack>
  )
}
