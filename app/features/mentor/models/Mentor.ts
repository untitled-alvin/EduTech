import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

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
  })

export interface Mentor extends Instance<typeof MentorModel> { }
export interface MentorSnapshotOut extends SnapshotOut<typeof MentorModel> { }
export interface MentorSnapshotIn extends SnapshotIn<typeof MentorModel> { }

