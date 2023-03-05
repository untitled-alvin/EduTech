import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"

/**
 * This represents an payment method
 */
type PaymentTypes = "paypal" | "google_pay" | "apple_pay" | "credit" | "other"

export const PaymentModel = types
  .model("Payment")
  .props({
    // href: types.string,
    // status: types.string,
    // image_url: types.maybeNull(types.string),
    // id: types.string,
    id: types.identifier,
    name: types.string,
    type: types.frozen<PaymentTypes>("other"),
  })
  .actions(withSetPropAction)
  .views((payment) => ({}))

export interface Payment extends Instance<typeof PaymentModel> { }
export interface PaymentSnapshotOut extends SnapshotOut<typeof PaymentModel> { }
export interface PaymentSnapshotIn extends SnapshotIn<typeof PaymentModel> { }

