import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { api, UserModel } from "../../../services/student-api"

export const MentorStoreModel = types
  .model("MentorStore")
  .props({
    limit: 10,
    skip: 0,
    hasNextPage: true,
    mentors: types.array(UserModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchMentors() {
      const response = await api.mentor.topMentor({ skip: store.skip, limit: store.limit })
      if (response.kind === "ok") {
        store.setProp("mentors", response.data.results)
      } else {
        console.tron.error(`Error fetching mentors: ${JSON.stringify(response)}`, [])
      }
    },

    async fetch() {
      // CALL API
      const response = await api.mentor.topMentor({ skip: store.skip, limit: store.limit })

      // HANDLE RESPONSE
      if (response.kind === "ok") {
        const { hasNextPage, results } = response.data

        if (store.skip > 0) {
          store.setProp("mentors", [...store.mentors, ...results])
        } else {
          store.setProp("mentors", results)
        }

        store.setProp("hasNextPage", hasNextPage)

      } else {
        console.tron.error(`Error fetching mentors: ${JSON.stringify(response)}`, [])
      }

      // RETURN RESPONSE
      return response
    },
  }))
  .actions((store) => ({
    async refresh() {
      store.setProp("skip", 0)
      return store.fetch()
    },

    async loadmore() {
      store.setProp("skip", store.skip + store.limit)
      return store.fetch()
    },
  }))

export interface MentorStore extends Instance<typeof MentorStoreModel> { }
export interface MentorStoreSnapshot extends SnapshotOut<typeof MentorStoreModel> { }
