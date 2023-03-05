import { observer } from "mobx-react-lite"
import { Avatar, IAvatarProps } from "native-base"
import React from "react"
import { kUserIMG } from "../../../components"
import { useStores } from "../../../models"

const testUri = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"

interface UserAvatarProps extends IAvatarProps { }

export const UserAvatar = observer(function UserAvatar(_props: UserAvatarProps) {
  const { authenticationStore: { user } } = useStores()
  const userImage = user?.image
  const source = userImage ? { uri: userImage } : kUserIMG
  // const avatarProps = { h: "32", w: "32" }
  // {...avatarProps}
  return <Avatar source={source} {..._props} />
})
