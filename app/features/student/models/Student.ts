import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * This represents an student.
 */
export const StudentModel = types
  .model("Student")
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

export interface Student extends Instance<typeof StudentModel> { }
export interface StudentSnapshotOut extends SnapshotOut<typeof StudentModel> { }
export interface StudentSnapshotIn extends SnapshotIn<typeof StudentModel> { }

