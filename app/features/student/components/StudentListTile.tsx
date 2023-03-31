import React, { useMemo } from "react"
import { Avatar } from "tamagui"
import { EduListTileProps, EduListTile, Chat, rnrImages, IconSVG } from "../../../components"
import { Student } from "../models/Student"

export type StudentListTileProps = EduListTileProps & { student: Student }

export function StudentListTile(props: StudentListTileProps) {
  const { student, ...rest } = props
  const imageUri = useMemo(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  return (
    <EduListTile bg="transparent"
      Leading={<Avatar size="$15" ><Avatar.Image src={imageUri} /></Avatar>}
      Trailing={<IconSVG color="$primary500" as={<Chat set="light" />} />}
      title={{ text: student.author }}
      subtitle={{ text: "Junior Designer" }}
      accessibilityLabel={student.name}
      {...rest}
    />
  )
}

