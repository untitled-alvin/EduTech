import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { InteractModel, api } from "../../../services/student-api"

export const InteractStoreModel = types
  .model("InteractStore")
  .props({
    interacts: types.array(InteractModel),
    review_index: types.maybeNull(types.string),
    hasNextPage: false,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    init() {
      store.setProp("review_index", null)
      store.setProp("hasNextPage", false)
    },

    async fetch() {
      const { review_index } = store
      const response = await api.interact.search({ where: { review_index } })

      if (response.kind === "ok") {
        const { hasNextPage, results } = response.data
        store.setProp("interacts", [...store.interacts, ...results])
        store.setProp("hasNextPage", hasNextPage)
      } else {
        console.tron.error(`Error fetching interacts: ${JSON.stringify(response)}`, [])
      }

      return response
    },
  }))
  .actions((store) => ({
    async refresh() {
      return store.fetch()
    },

    async loadmore() {
      return store.fetch()
    },
  }))
  .views((_) => ({}))

export interface InteractStore extends Instance<typeof InteractStoreModel> { }
export interface InteractStoreSnapshot extends SnapshotOut<typeof InteractStoreModel> { }

