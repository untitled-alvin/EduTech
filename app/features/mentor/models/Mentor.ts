import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"

/**
 * This represents an mentor.
 */
export const MentorModel = types
  .model("Mentor")
  .props({
    guid: types.identifier,
    name: "",
    pubDate: "", // Ex: 2022-08-12 21:05:36
    link: "",
    author: "",
    thumbnail: "",
    description: "",
    content: "",
    // categories: types.array(types.string),
  })
  .actions(withSetPropAction)
  .views((mentor) => ({
    get parsedTitleAndSubtitle() {
      const defaultValue = { title: mentor.name?.trim(), subtitle: "" }

      if (!defaultValue.title) return defaultValue

      const titleMatches = defaultValue.title.match(/^(RNR.*\d)(?: - )(.*$)/)

      if (!titleMatches || titleMatches.length !== 3) return defaultValue

      return { title: titleMatches[1], subtitle: titleMatches[2] }
    },
  }))

export interface Mentor extends Instance<typeof MentorModel> { }
export interface MentorSnapshotOut extends SnapshotOut<typeof MentorModel> { }
export interface MentorSnapshotIn extends SnapshotIn<typeof MentorModel> { }

