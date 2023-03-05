import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { api } from "../../../services/api/api"
import { CategoryModel } from "./Category"

export const CategoryStoreModel = types
  .model("CategoryStore")
  .props({
    categories: types.array(CategoryModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchCategories() {
      const response = await api.getCategories()
      if (response.kind === "ok") {
        store.setProp("categories", response.categories)
      } else {
        console.tron.error(`Error fetching categories: ${JSON.stringify(response)}`, [])
      }
    },
  }))
  .views((store) => ({
    get categoriesForList() {
      return store.categories
    },
  }))
  .actions((store) => ({

  }))

export interface CategoryStore extends Instance<typeof CategoryStoreModel> { }
export interface CategoryStoreSnapshot extends SnapshotOut<typeof CategoryStoreModel> { }

