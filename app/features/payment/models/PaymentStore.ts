import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction";
import { delay } from "../../../utils/delay";
import { Payment, PaymentModel } from "./Payment"

const payments = [
  PaymentModel.create({
    id: "paypal", name: "PayPal", type: "paypal",
  }),
  PaymentModel.create({
    id: "google_pay", name: "Google Pay", type: "google_pay",
  }),
  PaymentModel.create({
    id: "apple_pay", name: "Apple Pay", type: "apple_pay",
  }),
  PaymentModel.create({
    id: "credit", name: "•••• •••• •••• •••• 4679", type: "credit",
  }),
]

export const PaymentStoreModel = types
  .model("PaymentStore")
  .props({ payments: types.array(PaymentModel) })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchPayments() {
      await Promise.all([delay(700)]);
      if (!store.payments?.length) {
        store.setProp("payments", payments)
      } else { }
    },
    addPayment(payment: Payment) {
      store.payments.push(payment)
    },
    removePayment(payment: Payment) {
      store.payments.remove(payment)
    },
  }))
  .views((store) => ({
    get paymentsForList() {
      return store.payments
    },

    hasConnected(payment: Payment) {
      return store.payments.includes(payment)
    },
  }))
  .actions((store) => ({
    togglePayment(payment: Payment) {
      if (store.hasConnected(payment)) {
        store.addPayment(payment)
      } else {
        store.removePayment(payment)
      }
    },
  }))

export interface PaymentStore extends Instance<typeof PaymentStoreModel> { }
export interface PaymentStoreSnapshot extends SnapshotOut<typeof PaymentStoreModel> { }

