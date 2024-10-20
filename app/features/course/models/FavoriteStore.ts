import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../../../services/api"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { CourseModel, Course } from "../../../services/student-api"

export const FavoriteStoreModel = types
  .model("FavoriteStore")
  .props({
    current: 1, // Current page
    total: 1, // Total page
    limit: 5,
    isLoading: false,
    // courses: types.array(types.late(() => types.reference(CourseModel))),
    // courses: types.array(types.reference(CourseModel)),
    courses: types.array(CourseModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    initial() {
      store.setProp("total", 1)
      store.setProp("limit", 5)
      store.setProp("current", 1)
      store.setProp("courses", [])
      store.setProp("isLoading", false)
    },

    dispose() { },

    setCurrent(value: number) {
      store.setProp("current", value)
    },

    addFavorite(course: Course) {
      store.courses.push(course)
    },

    removeFavorite(course: Course) {
      store.setProp("courses", store.courses.filter((value) => value.id !== course.id))
    },

    async fetchCourses() {
      store.setProp("isLoading", true)

      const offset = (store.current - 1) * store.limit
      const response = await api.getCourses({ limit: store.limit, offset: offset })

      if (response.kind === "ok") {
        if (store.current > 1) {
          // store.setProp("courses", [...store.courses, ...response.data])
        } else {
          // store.setProp("courses", response.data)
        }
        store.setProp("total", response.total)
      } else {
        console.tron.error(`Error fetching courses: ${JSON.stringify(response)}`, [])
      }
      store.setProp("isLoading", false)
    },
  }))
  .views((store) => ({
    get ids() {
      return store.courses.map((value) => value.id)
    },

    get isEnd() {
      return store.current === store.total
    },

    get coursesForList() {
      return store.courses
    },
  }))
  .views((store) => ({
    hasFavorite(course: Course) {
      return store.ids.includes(course.id)
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

    toggleFavorite(course: Course) {
      const { name, id } = course
      const newS: Course = CourseModel.create({ name, id })
      if (store.hasFavorite(course)) {
        store.removeFavorite(newS)
      } else {
        store.addFavorite(newS)
      }
    },
  }))

export interface FavoriteStore extends Instance<typeof FavoriteStoreModel> { }
export interface FavoriteStoreSnapshot extends SnapshotOut<typeof FavoriteStoreModel> { }
