import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "../features/auth"
import { CategoryStoreModel } from "../features/category"
import { MentorStoreModel } from "../features/mentor"
import { PaymentStoreModel } from "../features/payment"
import { SourceStoreModel, FavoriteStoreModel, SourceDetailStoreModel } from "../features/source"
import { withSetPropAction } from "../utils/withSetPropAction"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  isIntroComplete: false,
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  mentorStore: types.optional(MentorStoreModel, {}),
  sourceStore: types.optional(SourceStoreModel, {}),
  categoryStore: types.optional(CategoryStoreModel, {}),
  favoriteStore: types.optional(FavoriteStoreModel, {}),
  paymentStore: types.optional(PaymentStoreModel, {}),
  sourceDetailStore: types.optional(SourceDetailStoreModel, {}),
})
  .actions((store) => ({
    init() {
      // store.authenticationStore = AuthenticationStoreModel.create()
      // store.episodeStore = EpisodeStoreModel.create()
      // store.mentorStore = MentorStoreModel.create()
      // store.sourceStore = SourceStoreModel.create()
      // store.categoryStore = CategoryStoreModel.create()
      // store.favoriteStore = FavoriteStoreModel.create()
      // store.paymentStore = PaymentStoreModel.create()
    },
    dispose() {
      // store.authenticationStore = AuthenticationStoreModel.create()
      // store.episodeStore = EpisodeStoreModel.create()
      // store.mentorStore = MentorStoreModel.create()
      // store.sourceStore = SourceStoreModel.create()
      // store.categoryStore = CategoryStoreModel.create()
      // store.favoriteStore = FavoriteStoreModel.create()
      // store.paymentStore = PaymentStoreModel.create()
    },

    completeIntro() {
      store.isIntroComplete = true
    }
  }))
  .views((store) => ({}))
  .actions((store) => ({}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
