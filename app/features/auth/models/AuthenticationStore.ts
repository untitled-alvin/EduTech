import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../../../utils/withSetPropAction"
import { authRepository } from "../repository"
import { User, UserModel } from "./User"
import * as SecureStore from 'expo-secure-store';


type AuthenticationStatus = "authenticated" | "authenticating" | "unauthenticated"

export const CREDENTIAL_PERSISTENCE_KEY = "CREDENTIAL"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    user: types.maybeNull(UserModel),
    status: types.frozen<AuthenticationStatus>("unauthenticated"),
    autoLogin: false,
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

    getCredential() {
      return SecureStore.getItemAsync(CREDENTIAL_PERSISTENCE_KEY)
    },

    setCredential(value?: string) {
      return SecureStore.setItemAsync(CREDENTIAL_PERSISTENCE_KEY, value)
    },

    clearCredential() {
      return SecureStore.deleteItemAsync(CREDENTIAL_PERSISTENCE_KEY)
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
      await Promise.all([
        store.clearCredential(), authRepository.logout()
      ]).then((_) => store.initial())
    },

    async signUp({ email, password }: { email: string, password: string }) {
      store.authenticating()

      const response = await authRepository.register({ email, password })

      if (response.kind === "ok") {
        authRepository.credential = response.credential
        await store.setCredential(response.credential)
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
        await store.setCredential(response.credential)
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
        await store.setCredential(response.credential)
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
      const { autoLogin } = store

      if (autoLogin) {

        const credential = await store.getCredential()

        if (credential) {

          authRepository.credential = credential

          store.authenticating()

          const response = await authRepository.fetchProfile()

          if (response.kind !== "ok") {
            store.unauthenticated()
          } else {
            store.authenticated(authRepository.currentUser)
          }

        } else {
          store.unauthenticated()
        }

      } else {
        store.unauthenticated()
      }
    },
  }))
  .preProcessSnapshot((snapshot) => {
    // remove sensitive data from snapshot to avoid secrets
    // being stored in AsyncStorage in plain text if backing up store
    const { user, ...rest } = snapshot // eslint-disable-line @typescript-eslint/no-unused-vars

    // see the following for strategies to consider storing secrets on device
    // https://reactnative.dev/docs/security#storing-sensitive-info

    return rest
  })

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> { }