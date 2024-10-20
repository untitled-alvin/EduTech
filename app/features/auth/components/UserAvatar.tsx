import { observer } from "mobx-react-lite"
import React from "react"
import { AvatarProps, Avatar } from "tamagui"
import { AssetsImage, kUserIMG } from "../../../components"
import { useStores } from "../../../models"

export const UserAvatar = observer((props: AvatarProps) => {
  const { authenticationStore } = useStores()
  const userImage = authenticationStore?.user?.image
  const source = userImage ? { uri: userImage } : kUserIMG
  // const avatarProps = { h: "32", w: "32" }
  // {...avatarProps}

  return (
    <Avatar size="$30" {...props} >
      <AssetsImage image="user" style={{ flex: 1 }} />
      {/* <Avatar.Image src={{ uri: kUserIMG }} /> */}
    </Avatar>
  )
})
