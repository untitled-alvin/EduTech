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
  .views((student) => ({
    get parsedTitleAndSubtitle() {
      const defaultValue = { title: student.name?.trim(), subtitle: "" }

      if (!defaultValue.title) return defaultValue

      const titleMatches = defaultValue.title.match(/^(RNR.*\d)(?: - )(.*$)/)

      if (!titleMatches || titleMatches.length !== 3) return defaultValue

      return { title: titleMatches[1], subtitle: titleMatches[2] }
    },
  }))

export interface Student extends Instance<typeof StudentModel> { }
export interface StudentSnapshotOut extends SnapshotOut<typeof StudentModel> { }
export interface StudentSnapshotIn extends SnapshotIn<typeof StudentModel> { }

