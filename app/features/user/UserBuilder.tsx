import React, { useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { User } from "../../services/student-api"
import { useStores } from "../../models"

type UserBuilderProps = { uid: string, render: (user?: User) => React.ReactElement }

export const UserBuilder = observer(({ uid, render }: UserBuilderProps) => {
  const { usersStore } = useStores()
  const lastId = useRef(uid)
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    find()
  }, [])

  if (uid !== lastId.current) {
    lastId.current = uid
    find()
  }

  async function find() {
    const response = await usersStore.find({ uid: lastId.current })
    if (response.kind == "ok") {
      setUser(usersStore.users.find((e) => e.uid === lastId.current))
    } else {
      setUser(undefined)
    }
  }

  return render(user)
})

// const imageUri = useMemo(() => {
//   return mentorImages[Math.floor(Math.random() * mentorImages.length)]
// }, [])