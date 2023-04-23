import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { CategoryModel, CategorySnapshotIn } from "./Category"
import { sheetsonApi } from "../../../services/sheetson"
// import { api } from "../../../services/api/api"

export const CategoryStoreModel = types
  .model("CategoryStore")
  .props({
    categories: types.array(CategoryModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchCategories() {
      const response = await sheetsonApi.categorySheet.search({})
      if (response.kind === "ok") {
        const categories: CategorySnapshotIn[] = response.data?.results?.map(
          (raw) => ({ ...raw, rssLabel: raw.rss_label })
        )
        store.setProp("categories", categories)
        // store.setProp("categories", response.data.results.map((e) => {
        // return CategorySnapshotIn( e )
        // }))
      } else {
        console.tron.error(`Error fetching categories: ${JSON.stringify(response)}`, [])
      }
    },
    //   const response = await api.getCategories()
    //   if (response.kind === "ok") {
    //     store.setProp("categories", response.categories)
    //   } else {
    //     console.tron.error(`Error fetching categories: ${JSON.stringify(response)}`, [])
    //   }
    // },
  }))
  .actions((_) => ({}))

export interface CategoryStore extends Instance<typeof CategoryStoreModel> { }
export interface CategoryStoreSnapshot extends SnapshotOut<typeof CategoryStoreModel> { }

