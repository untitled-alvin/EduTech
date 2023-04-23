import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"

/**
 * This represents an course.
 */
export const CourseModel = types
  .model("CourseModel")
  .props({
    id: types.identifier,
    name: types.maybeNull(types.string),
    keyword: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    category: types.maybeNull(types.string),
    original_price: types.maybeNull(types.number),
    promotion_price: types.maybeNull(types.number),
    country: types.maybeNull(types.string),
    duration: types.maybeNull(types.string),
    certificate: types.maybeNull(types.boolean),
    intro: types.maybeNull(types.string),
    banner: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .views((course) => ({}))

export interface Course extends Instance<typeof CourseModel> { }
export interface CourseSnapshotOut extends SnapshotOut<typeof CourseModel> { }
export interface CourseSnapshotIn extends SnapshotIn<typeof CourseModel> { }

// name?: string;
// keyword?: string;
// description?: string;
// category?: string;
// original_price?: number;
// promotion_price?: number;
// country?: string;
// duration?: string;
// certificate?: string;
// intro?: string;
// banner?: string;
// href: types.string,
// title: types.string,
// status: types.string,
// is_migration: types.maybeNull(types.boolean),
// import: types.maybeNull(types.string),
// image_url: types.maybeNull(types.string),
// id: types.string,