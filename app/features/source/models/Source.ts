import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"


/**
 * This represents an source.
 */
export const SourceModel = types
  .model("Source")
  .props({
    // href: types.string,
    title: types.string,
    // status: types.string,
    // is_migration: types.maybeNull(types.boolean),
    // import: types.maybeNull(types.string),
    // image_url: types.maybeNull(types.string),
    // id: types.string,
    id: types.identifier,
    // current_user_permission: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .views((source) => ({
    get parsedTitleAndSubtitle() {
      const defaultValue = { title: source.title?.trim(), subtitle: "" }

      if (!defaultValue.title) return defaultValue

      const titleMatches = defaultValue.title.match(/^(RNR.*\d)(?: - )(.*$)/)

      if (!titleMatches || titleMatches.length !== 3) return defaultValue

      return { title: titleMatches[1], subtitle: titleMatches[2] }
    },
  }))

export interface Source extends Instance<typeof SourceModel> { }
export interface SourceSnapshotOut extends SnapshotOut<typeof SourceModel> { }
export interface SourceSnapshotIn extends SnapshotIn<typeof SourceModel> { }

