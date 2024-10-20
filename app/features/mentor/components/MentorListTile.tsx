import React, { useMemo } from "react"
import { Avatar } from "tamagui"
import { ListTile, ListTileProps, mentorImages } from "../../../components"
import { User } from "../../../services/student-api"

type MentorListTileProps = ListTileProps & { mentor: User }

export const MentorListTile = (props: MentorListTileProps) => {
  const { mentor, ...rest } = props
  const { nickname = "", occupation = "" } = mentor
  const imageUri = useMemo(() => {
    return mentorImages[Math.floor(Math.random() * mentorImages.length)]
  }, [])

  return (
    <ListTile bg="transparent"
      Leading={<Avatar size="$15" ><Avatar.Image src={imageUri} /></Avatar>}
      title={{ text: nickname }}
      subtitle={{ text: occupation }}
      accessibilityLabel={nickname}
      {...rest}
    />
  )
}
