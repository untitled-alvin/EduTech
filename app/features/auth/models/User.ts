import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"

export type Gender = keyof typeof genders
export const genders = { other: {}, male: {}, female: {} }

// export type Gender = "other" | "male" | "female"


/**
 * This represents an user
 */
export const UserModel = types
  .model("User")
  .props({
    uid: types.identifier,
    fullname: types.maybeNull(types.string),
    nickname: types.maybeNull(types.string),
    birthdate: types.maybeNull(types.Date),
    // birthdate: types.maybeNull(types.Date),
    email: types.string,
    country: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
    gender: types.maybeNull(types.frozen<Gender>()),
    occupation: types.maybeNull(types.string),
    image: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .views((user) => ({
    get valid() {
      // return true
      return user.fullname
        || user.nickname
        || user.birthdate
        || user.phone
        || user.gender
    }
  }))

export interface User extends Instance<typeof UserModel> { }
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> { }
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> { }

// return !user.fullname
//   || !user.nickname
//   || !user.birthdate
//   || !user.country
//   || !user.phone
//   || !user.gender
//   || !user.occupation

// return !user.fullname
//   || !user.nickname
//   || !user.birthdate
//   || !user.country
//   || !user.phone
//   || !user.gender
//   || !user.occupation
//   || !user.image
