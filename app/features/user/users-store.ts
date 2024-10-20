import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../utils/withSetPropAction"
import { api, UserModel } from "../../services/student-api"

export const UsersStoreModel = types
  .model("UsersStore")
  .props({ users: types.array(UserModel) })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetch() {
      // CALL API
      const response = await api.mentor.topMentor({})

      // HANDLE RESPONSE
      if (response.kind === "ok") {
        store.setProp("users", [...store.users, ...response.data.results])
      } else {
        console.tron.error(`Error fetching mentors: ${JSON.stringify(response)}`, [])
      }

      // RETURN RESPONSE
      return response
    },

    async find({ uid }: { uid: string }) {
      const user = store.users.find((e) => e.uid === uid)

      if (user) return { kind: "ok", data: user }

      // CALL API
      const response = await api.user.find({ index: uid })

      // HANDLE RESPONSE
      if (response.kind === "ok") {
        store.setProp("users", [...store.users, response.data])
      } else {
        console.tron.error(`Error fetching user: ${JSON.stringify(response)}`, [])
      }

      // RETURN RESPONSE
      return response
    },
  }))
  .actions((store) => ({
    async refresh() {
      return store.fetch()
    },
  }))

export interface UsersStore extends Instance<typeof UsersStoreModel> { }
export interface UsersStoreSnapshot extends SnapshotOut<typeof UsersStoreModel> { }
