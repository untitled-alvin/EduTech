import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../../../services/api"
import { Source, SourceModel, SourceSnapshotIn } from "./Source"
import { withSetPropAction } from "../../../utils/withSetPropAction"

export const FavoriteStoreModel = types
  .model("FavoriteStore")
  .props({
    current: 1, // Current page
    total: 1, // Total page
    limit: 5,
    isLoading: false,
    // sources: types.array(types.late(() => types.reference(SourceModel))),
    // sources: types.array(types.reference(SourceModel)),
    sources: types.array(SourceModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    initial() {
      store.setProp("total", 1)
      store.setProp("limit", 5)
      store.setProp("current", 1)
      store.setProp("sources", [])
      store.setProp("isLoading", false)
    },

    dispose() { },

    setCurrent(value: number) {
      store.setProp("current", value)
    },

    addFavorite(source: Source) {
      store.sources.push(source)
    },

    removeFavorite(source: Source) {
      store.setProp("sources", store.sources.filter((value) => value.id !== source.id))
    },

    async fetchSources() {
      store.setProp("isLoading", true)

      const offset = (store.current - 1) * store.limit
      const response = await api.getSources({ limit: store.limit, offset: offset })

      if (response.kind === "ok") {
        if (store.current > 1) {
          // store.setProp("sources", [...store.sources, ...response.data])
        } else {
          // store.setProp("sources", response.data)
        }
        store.setProp("total", response.total)
      } else {
        console.tron.error(`Error fetching sources: ${JSON.stringify(response)}`, [])
      }
      store.setProp("isLoading", false)
    },
  }))
  .views((store) => ({
    get ids() {
      return store.sources.map((value) => value.id)
    },

    get isEnd() {
      return store.current === store.total
    },

    get sourcesForList() {
      return store.sources
    },
  }))
  .views((store) => ({
    hasFavorite(source: Source) {
      return store.ids.includes(source.id)
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

    toggleFavorite(source: Source) {
      const { title, id } = source
      const newS: Source = SourceModel.create({ title, id })
      if (store.hasFavorite(source)) {
        store.removeFavorite(newS)
      } else {
        store.addFavorite(newS)
      }
    },
  }))

export interface FavoriteStore extends Instance<typeof FavoriteStoreModel> { }
export interface FavoriteStoreSnapshot extends SnapshotOut<typeof FavoriteStoreModel> { }
