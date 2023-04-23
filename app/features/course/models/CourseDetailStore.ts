import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { CourseModel, Course } from "./Course"
import { LessonModel, LessonSnapshotIn } from "./Lesson"

const lessons = [
  LessonModel.create({
    id: '1',
    lock: true,
    title: "Set up Your Figma Account",
    duration: "5 mins"
  }),
  LessonModel.create({
    id: '2',
    lock: true,
    title: "Set up Your Figma Account",
    duration: "5 mins"
  }),
  LessonModel.create({
    id: '3',
    lock: true,
    title: "Take a Look Figma Interface",
    duration: "5 mins"
  }),
  LessonModel.create({
    id: '4',
    lock: true,
    title: "Working with Text & Grids",
    duration: "5 mins"
  }),
  LessonModel.create({
    id: '5',
    lock: true,
    title: "Using Figma Plugins",
    duration: "5 mins"
  }),
  LessonModel.create({
    id: '6',
    lock: true,
    title: "Let's Design a Sign-Up Form",
    duration: "5 mins"
  }),
  LessonModel.create({
    id: '7',
    lock: true,
    title: "Let's Create a Prototype",
    duration: "5 mins"
  }),
  LessonModel.create({
    id: '8',
    lock: true,
    title: "Sharing Work with Team",
    duration: "5 mins"
  }),
  LessonModel.create({
    id: '9',
    lock: true,
    title: "Exporting Assets",
    duration: "5 mins"
  })
]

export const CourseDetailStoreModel = types
  .model("CourseDetailStore")
  .props({
    course: types.maybeNull(CourseModel),
    lessons: types.maybeNull(types.array(LessonModel)),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchCourseModel() {
      store.setProp("lessons", lessons)
    },
  }))
  .views((store) => ({}))
  .actions((store) => ({}))

export interface CourseDetailStore extends Instance<typeof CourseDetailStoreModel> { }
export interface CourseDetailStoreSnapshot extends SnapshotOut<typeof CourseDetailStoreModel> { }

