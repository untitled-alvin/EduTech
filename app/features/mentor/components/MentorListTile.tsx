import React, { useMemo } from "react"
import { Avatar } from "tamagui"
import { ListTile, ListTileProps, rnrImages } from "../../../components"
import { Mentor } from "../models"

type MentorListTileProps = ListTileProps & { mentor: Mentor }

export const MentorListTile = function MentorListTile(props: MentorListTileProps) {
  const { mentor, ...rest } = props
  const imageUri = useMemo(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  return (
    <ListTile
      Leading={<Avatar size="$15" ><Avatar.Image src={imageUri} /></Avatar>}
      title={{ text: `${mentor.author}` }}
      subtitle={{ text: `${mentor.author}` }}
      accessibilityLabel={mentor.name}
      {...rest}
    />
  )
}
