import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export type Page<T> = {
  results: T[]
  hasNextPage: boolean
}

/**
 * This represents an category.
 */
export const CategoryModel = types
  .model("Category")
  .props({
    value: types.identifier,
    rssLabel: "",
    label: "",
    ic: types.maybeNull(types.string)
  })

export interface Category extends Instance<typeof CategoryModel> { }
export interface CategorySnapshotOut extends SnapshotOut<typeof CategoryModel> { }
export interface CategorySnapshotIn extends SnapshotIn<typeof CategoryModel> { }

/**
 * This represents an course.
 */
export const CourseModel = types
  .model("Course")
  .props({
    id: types.identifier,
    name: types.maybeNull(types.string),
    keyword: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    category: types.maybeNull(types.string),
    type: "FREE",
    original_price: types.maybeNull(types.number),
    promotion_price: types.maybeNull(types.number),
    country: types.maybeNull(types.string),
    duration: types.maybeNull(types.string),
    certificate: types.maybeNull(types.boolean),
    mentor_index: types.maybeNull(types.string),
    intro: types.maybeNull(types.string),
    banner: types.maybeNull(types.string),
  })

export interface Course extends Instance<typeof CourseModel> { }
export interface CourseSnapshotOut extends SnapshotOut<typeof CourseModel> { }
export interface CourseSnapshotIn extends SnapshotIn<typeof CourseModel> { }

/**
 * This represents an lesson.
 */
export const LessonModel = types
  .model("Lesson")
  .props({
    id: types.string,
    course_index: types.maybeNull(types.integer),
    index: types.maybeNull(types.integer),
    name: types.maybeNull(types.string),
    duration: types.maybeNull(types.integer),
    section: types.maybeNull(types.string),
  })
  .views((store) => ({
    get lock() {
      // return false
      return true
    },
  }))


export interface Lesson extends Instance<typeof LessonModel> { }
export interface LessonSnapshotOut extends SnapshotOut<typeof LessonModel> { }
export interface LessonSnapshotIn extends SnapshotIn<typeof LessonModel> { }


/**
* This represents an mentor.
*/
export const MentorModel = types
  .model("Mentor")
  .props({
    // uid: types.identifier,
    uid: types.string,
    fullname: types.maybeNull(types.string),
    nickname: types.maybeNull(types.string),
    // birthdate: types.maybeNull(types.Date),
    // birthdate: types.maybeNull(types.Date),
    email: types.string,
    country: types.maybeNull(types.string),
    // phone: types.maybeNull(types.string),
    // gender: types.maybeNull(types.string),
    // gender: types.maybeNull(types.frozen<Gender>()),
    occupation: types.maybeNull(types.string),
    avatar: types.maybeNull(types.string),
  })

export interface Mentor extends Instance<typeof MentorModel> { }
export interface MentorSnapshotOut extends SnapshotOut<typeof MentorModel> { }
export interface MentorSnapshotIn extends SnapshotIn<typeof MentorModel> { }
