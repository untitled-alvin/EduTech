import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * This represents an category.
 */
export const CategoryModel = types
  .model("Category")
  .props({
    value: types.identifier,
    rssLabel: "",
    label: "",
    ic: types.maybeNull(types.string)
  })

export interface Category extends Instance<typeof CategoryModel> { }
export interface CategorySnapshotOut extends SnapshotOut<typeof CategoryModel> { }
export interface CategorySnapshotIn extends SnapshotIn<typeof CategoryModel> { }
