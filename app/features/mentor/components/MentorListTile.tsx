import React, { useMemo } from "react"
import { Avatar } from "tamagui"
import { EduListTile, EduListTileProps, rnrImages } from "../../../components"
import { Mentor } from "../models"

type MentorListTileProps = EduListTileProps & { mentor: Mentor }

export const MentorListTile = function MentorListTile(props: MentorListTileProps) {
  const { mentor, ...rest } = props
  const imageUri = useMemo(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  return (
    <EduListTile bg="transparent"
      Leading={<Avatar size="$15" ><Avatar.Image src={imageUri} /></Avatar>}
      title={{ text: `${mentor.author}` }}
      subtitle={{ text: `${mentor.author}` }}
      accessibilityLabel={mentor.name}
      {...rest}
    />
  )
}
