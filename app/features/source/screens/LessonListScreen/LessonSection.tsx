import React from "react"
import { EduBody } from "../../../../components"
import { Column, Row } from "native-base"
import { LessonCard } from "./LessonCard"
import { navigate } from "../../../../navigators"

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
    <Column>
      <Row paddingRight="6"
        paddingLeft="6"
        alignItems="center"
        justifyContent="space-between"
      >
        <EduBody
          bold
          sizeT="large"
          text={title}
          color={'greyScale.700'}
          flex={1}
        />
        <EduBody text={duration} sizeT="large" bold color={'primary.500'} />
      </Row>

      <Column padding="6" paddingBottom={0}>
        {lessons?.map((value, index) => {
          const locked = lock[Math.floor(Math.random() * lock.length)]
          const item = data[Math.floor(Math.random() * data.length)]

          return (
            <LessonCard
              key={index}
              locked={locked}
              number={`${('0' + value).slice(-2)}`}
              title={item.title}
              duration={item.duration}
              onPress={() => navigate("SourcePlay")}
              marginBottom={6}
            />
          )
        }
        )}
      </Column>
    </Column>
  )
}
