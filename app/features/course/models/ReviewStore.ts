import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { ReviewModel, api } from "../../../services/student-api"

export const ReviewStoreModel = types
  .model("ReviewStore")
  .props({
    rate: types.maybeNull(types.number),
    course_index: types.maybeNull(types.string),
    limit: types.maybeNull(types.number),
    skip: 0,
    hasNextPage: false,
    reviews: types.maybeNull(types.array(ReviewModel)),
    total: 0,
    average: 0,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    init() {
      store.setProp("rate", null)
      store.setProp("course_index", null)
      // store.setProp("limit", 10)
      store.setProp("limit", null)
      store.setProp("skip", 0)
      store.setProp("hasNextPage", false)
      store.setProp("reviews", [])
      store.setProp("total", 0)
      store.setProp("average", 0)
    },

    async fetch() {
      await this.fetchReviews()
      await this.fetchInfo()
    },

    async fetchReviews() {
      const { limit, skip, course_index, rate } = store
      const response = await api.review.search({
        skip, limit,
        where: { course_index, rate: rate?.toString() }
      })

      if (response.kind === "ok") {
        const { hasNextPage, results } = response.data

        if (store.skip > 0) {
          store.setProp("reviews", [...store.reviews, ...results])
        } else {
          store.setProp("reviews", results)
        }

        store.setProp("hasNextPage", hasNextPage)
      } else {
        console.tron.error(`Error fetching reviews: ${JSON.stringify(response)}`, [])
      }

      return response
    },

    async fetchInfo() {
      const { course_index } = store
      const response = await api.review.search({ where: { course_index } })

      if (response.kind === "ok") {
        const { results } = response.data
        const total = results?.reduce((arr, { rate }) => arr + (rate ?? 0), 0) ?? 0
        const average = total / (results?.length ?? 0)
        store.setProp("total", total)
        store.setProp("average", average)
      } else {
        console.tron.error(`Error fetching reviews: ${JSON.stringify(response)}`, [])
      }

      return response
    },

  }))
  .actions((store) => ({
    async refresh() {
      store.setProp("skip", 0)
      return store.fetch()
    },

    async loadmore() {
      store.setProp("skip", store.skip + store.limit)
      return store.fetch()
    },
  }))
  .views((_) => ({}))

export interface ReviewStore extends Instance<typeof ReviewStoreModel> { }
export interface ReviewStoreSnapshot extends SnapshotOut<typeof ReviewStoreModel> { }

