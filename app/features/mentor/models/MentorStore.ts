import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { api } from "../../../services/api"
import { Mentor, MentorModel } from "./Mentor"

export const MentorStoreModel = types
  .model("MentorStore")
  .props({
    mentors: types.array(MentorModel),
    favorites: types.array(types.reference(MentorModel)),
    favoritesOnly: false,
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
    addFavorite(mentor: Mentor) {
      store.favorites.push(mentor)
    },
    removeFavorite(mentor: Mentor) {
      store.favorites.remove(mentor)
    },
  }))
  .views((store) => ({
    get mentorsForList() {
      return store.favoritesOnly ? store.favorites : store.mentors
    },

    hasFavorite(mentor: Mentor) {
      return store.favorites.includes(mentor)
    },
  }))
  .actions((store) => ({
    toggleFavorite(mentor: Mentor) {
      if (store.hasFavorite(mentor)) {
        store.removeFavorite(mentor)
      } else {
        store.addFavorite(mentor)
      }
    },
  }))


export interface MentorStore extends Instance<typeof MentorStoreModel> { }
export interface MentorStoreSnapshot extends SnapshotOut<typeof MentorStoreModel> { }
