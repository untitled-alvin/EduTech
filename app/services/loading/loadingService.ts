import { Instance, SnapshotOut, types } from "mobx-state-tree"

type LoadingServiceStatus = "idle" | "busy"

/**
 * A LoadingService model.
 */
export const LoadingServiceModel = types.model("LoadingService").props({
  status: types.frozen<LoadingServiceStatus>("idle"),
})
  .actions((store) => ({
    busy() {
      store.status = "busy"
    },
    idle() {
      store.status = "idle"
    },
  }))
  .views((store) => ({
    get isBusy() {
      return store.status === "busy"
    },
    get isIdle() {
      return store.status === "idle"
    },
  }))
  .views((store) => ({
    get isLoading() {
      return store.isBusy
    },
  }))
  .actions((store) => ({
    showLoading() {
      store.busy()
    },
    hideLoading() {
      store.idle()
    },
  }))

/**
 * The LoadingService instance.
 */
export interface LoadingService extends Instance<typeof LoadingServiceModel> { }
/**
 * The data of a LoadingService.
 */
export interface LoadingServiceSnapshot extends SnapshotOut<typeof LoadingServiceModel> { }
