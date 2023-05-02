import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { eduApi, CategoryModel } from "../../../services/edu-api"
// import { api } from "../../../services/api/api"

export const CategoryStoreModel = types
  .model("CategoryStore")
  .props({ categories: types.array(CategoryModel) })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchCategories() {
      const response = await eduApi.category.search({})
      if (response.kind === "ok") {
        store.setProp("categories", response.data?.results)
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

