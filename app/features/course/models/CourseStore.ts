import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { api } from "../../../services/api"
import { CourseModel } from "./Course"

export const CourseStoreModel = types
  .model("CourseStore")
  .props({
    current: 1, // Current page
    total: 1, // Total page
    limit: 10,
    isLoading: false,
    courses: types.array(CourseModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    init() {
      store.setProp("total", 1)
      store.setProp("limit", 10)
      store.setProp("current", 1)
      store.setProp("courses", [])
      store.setProp("isLoading", false)
    },

    setCurrent(value: number) {
      store.setProp("current", value)
    },

    async fetchCourses() {
      store.setProp("isLoading", true)
      const offset = (store.current - 1) * store.limit

      const response = await api.getCourses({ limit: store.limit, offset: offset })
      if (response.kind === "ok") {
        // This is where we transform the data into the shape we expect for our MST model.

        if (store.current > 1) {
          store.setProp("courses", [...store.courses, ...response.data])
        } else {
          store.setProp("courses", response.data)
        }
        store.setProp("total", response.total)
      } else {
        console.tron.error(`Error fetching courses: ${JSON.stringify(response)}`, [])
      }
      store.setProp("isLoading", false)
    },
  }))
  .views((store) => ({
    get isEnd() {
      // return true
      return store.current === store.total
    },

    get coursesForList() {
      return store.courses
    },
  }))
  .actions((store) => ({
    async refresh() {
      store.setCurrent(1)
      await store.fetchCourses()
    },

    async next() {
      store.setCurrent(store.current + 1)
      await store.fetchCourses()
    },
  }))

export interface CourseStore extends Instance<typeof CourseStoreModel> { }
export interface CourseStoreSnapshot extends SnapshotOut<typeof CourseStoreModel> { }

