import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * This represents an lesson.
 */
export const LessonModel = types
  .model("Lesson")
  .props({
    // status: types.string,
    // is_migration: types.maybeNull(types.boolean),
    // import: types.maybeNull(types.string),
    // image_url: types.maybeNull(types.string),
    // id: types.string,
    // href: types.string,
    id: types.identifier,
    title: types.string,
    duration: types.string,
    lock: types.boolean,
  })

export interface Lesson extends Instance<typeof LessonModel> { }
export interface LessonSnapshotOut extends SnapshotOut<typeof LessonModel> { }
export interface LessonSnapshotIn extends SnapshotIn<typeof LessonModel> { }

