import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import {
  api,
  CourseModel,
  Lesson,
  LessonModel,
  UserModel,
} from "../../../services/student-api"
import { ReviewStoreModel } from "./ReviewStore"

export const CourseDetailStoreModel = types
  .model("CourseDetailStore")
  .props({
    course: types.maybeNull(CourseModel),
    mentor: types.maybeNull(UserModel),
    lessons: types.maybeNull(types.array(LessonModel)),
    reviewStore: types.optional(ReviewStoreModel, {}),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchLesson() {
      const course_index = store.course?.id
      const response = await api.lesson.search({ course_index })

      if (response.kind === "ok") {
        store.setProp("lessons", response.data.results)
      } else {
        console.tron.error(`Error fetching lessons: ${JSON.stringify(response)}`, [])
      }
      return response
    },

    async fetchMentor() {
      const mentor_index = store.course?.mentor_index
      const response = await api.mentor.read({ index: mentor_index })

      if (response.kind === "ok") {
        store.setProp("mentor", response.data)
      } else {
        console.tron.error(`Error fetching mentor: ${JSON.stringify(response)}`, [])
      }
      return response
    },

    async fetchReviews() {
      store.reviewStore.setProp("course_index", store.course?.id)
      return store.reviewStore.fetch()
    },


  }))
  .views((store) => ({
    isSection(obj: Object) {
      return isSection(obj)
    },

    get reviewNumber() {
      return store.reviewStore.total
    },

    get reviews() {
      return store.reviewStore.reviews
    },

    get reviewsAveragePoint() {
      return store.reviewStore.average
    },

    get duration() {
      return store.lessons?.reduce((total, { duration }) => total + duration, 0)
    },

    get lessonNumber(): number {
      return store.lessons?.length ?? 0
    },

    get isHasEnrolled(): boolean {
      return !store.lessons?.find(({ lock }) => lock === true)
    },

    get groupLessons(): Map<string, Lesson[]> {
      return store.lessons?.reduce((result, value: Lesson) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[value["section"]] = result[value["section"]] || []).push(value)
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        // console.log(result)
        return result
      }, {} as Map<string, Lesson[]>)  // em
    },

    get flatLessons(): (Lesson | Section)[] {
      return this.groupLessons && Object.entries(this.groupLessons).map(([key, value], index) => {
        const duration = (value as Lesson[]).reduce((arr, value) => arr + value.duration, 0)

        return [
          { name: `Section ${index + 1} - ${key}`, duration: duration },
          ...value as []
        ]
      }).flat()
    },
  }))
  .preProcessSnapshot((_) => { return {} })


// Map<string, Lesson[]>

export interface CourseDetailStore extends Instance<typeof CourseDetailStoreModel> { }
export interface CourseDetailStoreSnapshot extends SnapshotOut<typeof CourseDetailStoreModel> { }

export type Section = { name?: string; duration?: number }
// export type GroupLesson = { [key: string]: Lesson[] | }

// 👇️ checks if obj has properties of Person
export function isSection(obj: Object): obj is Section {
  return 'name' in obj && 'duration' in obj
}
