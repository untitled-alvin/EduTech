import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { authRepository } from "../repository"
import { User, UserModel } from "./User"

type AuthenticationStatus = "authenticated" | "authenticating" | "unauthenticated"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    user: types.maybeNull(UserModel),
    status: types.frozen<AuthenticationStatus>("unauthenticated"),
    autoLogin: false,
    credential: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    initial() {
      store.user = undefined
      store.status = "unauthenticated"
      store.autoLogin = false
    },
    setAutoLogin(value: boolean) {
      store.autoLogin = value
    },
    authenticated(user: User) {
      store.user = user
      store.status = "authenticated"
    },
    authenticating() {
      store.status = "authenticating"
    },
    unauthenticated() {
      store.user = undefined
      store.status = "authenticating"
    },

  }))
  .views((store) => ({
    get isAuthenticating() {
      return store.status === "authenticating"
    },
    get isAuthenticated() {
      return store.status === "authenticated" && store.user
    },
    get isUnAuthenticated() {
      return store.status === "unauthenticated"
    },
  }))
  .actions((store) => ({
    async logout() {
      authRepository.logout().then((response) => store.initial())
    },

    async signUp({ email, password }: { email: string, password: string }) {
      store.authenticating()

      const response = await authRepository.register({ email, password })

      if (response.kind === "ok") {
        authRepository.credential = response.credential
        store.setProp("credential", response.credential)
        store.authenticated(response.user)
      } else {
        store.unauthenticated()
        console.tron.error(`Error register: ${JSON.stringify(response)}`, [])
      }

      return response
    },

    async loginPassword({ email, password }: { email: string, password: string }) {
      store.authenticating()

      const response = await authRepository.login({ email, password })

      if (response.kind === "ok") {
        authRepository.credential = response.credential
        store.setProp("credential", response.credential)
        store.authenticated(response.user)
      } else {
        store.unauthenticated()
        console.tron.error(`Error login: ${JSON.stringify(response)}`, [])
      }

      return response
    },

    async loginGoogle() {
      store.authenticating()

      const response = await authRepository.login(
        { email: "andrew_ainsley@yourdomain.com", password: "1234567" })

      if (response.kind === "ok") {
        authRepository.credential = response.credential
        store.setProp("autoLogin", true)
        store.setProp("credential", response.credential)
        store.authenticated(response.user)
      } else {
        store.unauthenticated()
        console.tron.error(`Error login: ${JSON.stringify(response)}`, [])
      }

      return response
    },

    async update(user: User) {
      const response = await authRepository.updateProfile(user)

      if (response.kind === "ok") {
        store.authenticated(response.user)
      } else {
        console.tron.error(`Error update: ${JSON.stringify(response)}`, [])
      }

      return response
    },

    async fetchProfile() {
      const response = await authRepository.fetchProfile()

      if (response.kind === "ok") {
        store.authenticated(authRepository.currentUser)
      } else {
        store.authenticated(authRepository.currentUser)
        console.tron.error(`Error fetchProfile: ${JSON.stringify(response)}`, [])
      }

      return response
    },

  }))
  .actions((store) => ({
    // Check autoLogin and credential to restore session
    async restoreSession() {
      const { autoLogin, credential } = store

      if (!autoLogin || !credential) {
        store.unauthenticated()
      } else {
        authRepository.credential = credential

        store.authenticating()

        const response = await authRepository.fetchProfile()
        if (response.kind !== "ok") {
          store.unauthenticated()
        } else {
          store.authenticated(authRepository.currentUser)
        }
      }
    },
  }))
  .preProcessSnapshot((snapshot) => {
    // console.log(snapshot)
    // remove sensitive data from snapshot to avoid secrets
    // being stored in AsyncStorage in plain text if backing up store
    const { ...rest } = snapshot // eslint-disable-line @typescript-eslint/no-unused-vars

    // see the following for strategies to consider storing secrets on device
    // https://reactnative.dev/docs/security#storing-sensitive-info

    return rest
  })

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> { }

// store.authenticating()
// await Promise.all([delay(700)])
// store.authenticated(user)
// store.unauthenticated()