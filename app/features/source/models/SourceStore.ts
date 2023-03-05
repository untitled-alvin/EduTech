import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { api } from "../../../services/api"
import { Source, SourceModel, SourceSnapshotIn } from "./Source"

export const SourceStoreModel = types
  .model("SourceStore")
  .props({
    current: 1, // Current page
    total: 1, // Total page
    limit: 10,
    isLoading: false,
    sources: types.array(SourceModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    init() {
      store.setProp("total", 1)
      store.setProp("limit", 10)
      store.setProp("current", 1)
      store.setProp("sources", [])
      store.setProp("isLoading", false)
    },

    setCurrent(value: number) {
      store.setProp("current", value)
    },

    async fetchSources() {
      store.setProp("isLoading", true)
      const offset = (store.current - 1) * store.limit

      const response = await api.getSources({ limit: store.limit, offset: offset })
      if (response.kind === "ok") {
        // This is where we transform the data into the shape we expect for our MST model.

        if (store.current > 1) {
          store.setProp("sources", [...store.sources, ...response.data])
        } else {
          store.setProp("sources", response.data)
        }
        store.setProp("total", response.total)
      } else {
        console.tron.error(`Error fetching sources: ${JSON.stringify(response)}`, [])
      }
      store.setProp("isLoading", false)
    },
  }))
  .views((store) => ({
    get isEnd() {
      // return true
      return store.current === store.total
    },

    get sourcesForList() {
      return store.sources
    },
  }))
  .actions((store) => ({
    async refresh() {
      store.setCurrent(1)
      await store.fetchSources()
    },

    async next() {
      store.setCurrent(store.current + 1)
      await store.fetchSources()
    },
  }))

export interface SourceStore extends Instance<typeof SourceStoreModel> { }
export interface SourceStoreSnapshot extends SnapshotOut<typeof SourceStoreModel> { }

