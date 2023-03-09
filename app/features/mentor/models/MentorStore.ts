import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { api } from "../../../services/api"
import { MentorModel } from "./Mentor"

export const MentorStoreModel = types
  .model("MentorStore")
  .props({
    mentors: types.array(MentorModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchMentors() {
      const response = await api.getEpisodes()
      if (response.kind === "ok") {
        store.setProp("mentors", response.episodes)
      } else {
        console.tron.error(`Error fetching mentors: ${JSON.stringify(response)}`, [])
      }
    },
  }))


export interface MentorStore extends Instance<typeof MentorStoreModel> { }
export interface MentorStoreSnapshot extends SnapshotOut<typeof MentorStoreModel> { }
