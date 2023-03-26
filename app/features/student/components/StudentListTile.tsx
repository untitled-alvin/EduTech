import React, { useMemo } from "react"
import { Avatar } from "tamagui"
import { ListTileProps, ListTile, Chat, rnrImages, IconSVG } from "../../../components"
import { Student } from "../models/Student"

export type StudentListTileProps = ListTileProps & { student: Student }

export function StudentListTile(props: StudentListTileProps) {
  const { student, ...rest } = props
  const imageUri = useMemo(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  return (
    <ListTile
      Leading={<Avatar size="$15" ><Avatar.Image src={imageUri} /></Avatar>}
      Trailing={<IconSVG color="$primary500" as={<Chat set="light" />} />}
      title={{ text: student.author }}
      subtitle={{ text: "Junior Designer" }}
      accessibilityLabel={student.name}
      {...rest}
    />
  )
}

