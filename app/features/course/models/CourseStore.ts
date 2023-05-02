import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { CourseModel, eduApi } from "../../../services/edu-api"

export const CourseStoreModel = types
  .model("CourseStore")
  .props({
    limit: 10,
    skip: 0,
    hasNextPage: true,
    courses: types.array(CourseModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    init() {
      store.setProp("limit", 10)
      store.setProp("limit", 0)
      store.setProp("hasNextPage", true)
      store.setProp("courses", [])
    },

    async fetchCourses() {
      const response = await eduApi.course.search({ skip: store.skip, limit: store.limit })

      if (response.kind === "ok") {
        store.setProp("courses", response.data.results)
      } else {
        console.tron.error(`Error fetching mentors: ${JSON.stringify(response)}`, [])
      }

      return response
    },


  }))
  .views((store) => ({
    get coursesForList() {
      return store.courses
    },
  }))
  .actions((store) => ({
    async fetch() {
      const response = await eduApi.course.search({ skip: store.skip, limit: store.limit })

      if (response.kind === "ok") {
        const { hasNextPage, results } = response.data

        if (store.skip > 0) {
          store.setProp("courses", [...store.courses, ...results])
        } else {
          store.setProp("courses", results)
        }

        store.setProp("hasNextPage", hasNextPage)
      } else {
        console.tron.error(`Error fetching mentors: ${JSON.stringify(response)}`, [])
      }

      return response
    },

    async refresh() {
      store.setProp("skip", 0)
      return this.fetch()
    },

    async loadmore() {
      store.setProp("skip", store.skip + store.limit)
      return this.fetch()
    },

  }))

export interface CourseStore extends Instance<typeof CourseStoreModel> { }
export interface CourseStoreSnapshot extends SnapshotOut<typeof CourseStoreModel> { }

