import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { CourseModel, Lesson, LessonModel, MentorModel, eduApi } from "../../../services/edu-api"

export const CourseDetailStoreModel = types
  .model("CourseDetailStore")
  .props({
    course: types.maybeNull(CourseModel),
    mentor: types.maybeNull(MentorModel),
    lessons: types.maybeNull(types.array(LessonModel)),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchLesson() {
      const response = await eduApi.lesson.search({})

      if (response.kind === "ok") {
        store.setProp("lessons", response.data.results)
      } else {
        console.tron.error(`Error fetching lessons: ${JSON.stringify(response)}`, [])
      }
      return response
    },

    async fetchMentor() {
      const response = await eduApi.mentor.read({ index: +store.course?.mentor_index })

      if (response.kind === "ok") {
        store.setProp("mentor", response.data)
      } else {
        console.tron.error(`Error fetching mentor: ${JSON.stringify(response)}`, [])
      }
      return response
    },

    isSection(obj: Object) {
      return isSection(obj)
    },
  }))
  .views((store) => ({
    get lessonNumber(): number {
      return store.lessons?.length ?? 0
    },

    get isHasEnrolled(): boolean {
      return !store.lessons?.find(({ lock }) => lock === true)
    },

    get groupLessons(): Map<string, Lesson[]> {
      // return undefined
      return store.lessons?.reduce((result, value: Lesson) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[value["section"]] = result[value["section"]] || []).push(value)
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result
      }, new Map<string, Lesson[]>()) // em
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

// Map<string, Lesson[]>

export interface CourseDetailStore extends Instance<typeof CourseDetailStoreModel> { }
export interface CourseDetailStoreSnapshot extends SnapshotOut<typeof CourseDetailStoreModel> { }

export type Section = { name?: string; duration?: number }
// export type GroupLesson = { [key: string]: Lesson[] | }

// 👇️ checks if obj has properties of Person
export function isSection(obj: Object): obj is Section {
  return 'name' in obj && 'duration' in obj
}
