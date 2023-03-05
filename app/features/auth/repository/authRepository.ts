import BcryptReactNative from 'bcrypt-react-native';
import { Gender, User, UserModel, UserSnapshotIn } from '../models/User';
import { sheetsonApi, SheetsonApi, UsersRow } from "../../../services/sheetson";
import { AuthProblem, getAuthProblem } from "./authProblem";

// hash password
async function hashPassword(plaintextPassword): Promise<string> {
  const salt = await BcryptReactNative.getSalt(10);
  const hash = await BcryptReactNative.hash(salt, plaintextPassword);
  return hash
}

// compare password
async function comparePassword(plaintextPassword, hash): Promise<string> {
  const isSame = await BcryptReactNative.compareSync(plaintextPassword, hash)
  return isSame
}

function mapGender(gender: string): Gender {
  if (!gender) return undefined
  if (gender === "male") return "male"
  if (gender === "female") return "female"
  return "other"
}

// map UsersRow to User
function mapUsersRowToUser(usersRow: UsersRow): User {
  const { birthdate, rowIndex, gender, password, ...rest } = usersRow

  return UserModel.create({
    uid: `${rowIndex}`,
    birthdate: birthdate ? new Date(birthdate) : undefined,
    gender: mapGender(gender),
    ...rest
  })
}

// map User to UsersRow
function mapUserToUsersRow(user: User): UsersRow {
  const { birthdate, uid, ...rest } = user

  return {
    rowIndex: +uid,
    birthdate: birthdate?.toISOString(),
    ...rest,
  }
}


// log error
const logError = (msg: string, e) => {
  if (__DEV__) console.tron.error(msg, e.stack)
}

/**
 * This Service class lets you handle, manages user authentication
 *
 * E.g.:
 *
 *  const authRepository = AuthService(sheetsonApi)
 * 
 *  authRepository.credential = "XXXXXX"
 *  authRepository.fetchProfile()        // fetch Profile
 *  authRepository.currentUser           // return Current User
 * 
 * Or: Request credential
 * 
 *  const credential = await authRepository.login({email: "xxx", password: "xxxx"})
 * 
 *  authRepository.credential = credential
 *  authRepository.fetchProfile()
 *  authRepository.currentUser
 * 
 */

export class AuthRepository {
  private _credential?: string
  private _currentUser?: User
  private _sheetsonApi: SheetsonApi

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(sheetsonApi: SheetsonApi, credential?: string) {
    this._credential = credential
    this._currentUser = undefined
    this._sheetsonApi = sheetsonApi
  }

  set credential(credential: string) {
    this._credential = credential
  }

  /**
   * Return true when @_credential is setting, otherwise
   * And user profile is fetch
   */
  get isAuthenticated() {
    return !!this._credential
  }

  /**
   * Get current user
   * Return current user when credential is setting
   * And user profile is fetch
   */
  get currentUser() {
    return this._currentUser
  }

  /**
   * get profile current user from api
   * 
   * Return @ok with @user when success
   * 
   * Return @unauthorized problem when the credential is not valid.
   * 
   * Return @user_does_not_exist problem when user does not exist
   * 
   * Return @bad_data problem when parse raw data to user failure
   * 
   */
  private async _getCurrentUserProfile(): Promise<{
    kind: "ok", user: User
  } | AuthProblem> {
    // Check authenticated
    if (!this.isAuthenticated) return { kind: "unauthorized" }

    // Get row index from credential
    const rowIndex = +this._credential;
    const response = await this._sheetsonApi.usersSheet
      .findByRowIndex(rowIndex)

    if (response.kind !== "ok") return getAuthProblem(response)

    if (response.usersRow) {
      try {
        const usersRow = response.usersRow
        const user = mapUsersRowToUser(usersRow)

        return { kind: "ok", user }
      } catch (e) {
        logError(`Bad data: ${e.message}\n${response}`, e)
        return { kind: "bad_data", msg: `Bad data: ${e.message}\n${response}` }
      }
    }

    return { kind: "user_does_not_exist" }
  }

  /**
   * Request API update profile current user
   * 
   * Return @ok with @user when success
   * 
   * Return @unauthorized problem when the credential is not valid.
   * 
   * Return @user_does_not_exist problem when user does not exist
   * 
   * Return @bad_data problem when parse raw data to user failure
   * 
   */
  // uid: "uid",
  // fullname: "Andrew Aisled",
  // nickname: "Andrew",
  // birthdate: new Date("12/27/1995"),
  // // birthdate: new Date("12/27/1995"),
  // email: "andrew_ainsley@yourdomain.com",
  // country: "United States",
  // phone: "+1 111 467 378 399",
  // gender: "Male",
  // occupation: "Student",
  private async _updateCurrentUserProfile(
    user: User
  ): Promise<{ kind: "ok"; user: User } | AuthProblem> {
    if (!this.isAuthenticated) return { kind: "unauthorized" }


    // make the api call
    const usersRow: UsersRow = mapUserToUsersRow(user)
    const response = await this._sheetsonApi.usersSheet
      .update(usersRow)

    if (response.kind !== "ok") return getAuthProblem(response)

    if (response.usersRow) {
      try {
        const usersRow = response.usersRow
        const user = mapUsersRowToUser(usersRow)

        return { kind: "ok", user }
      } catch (e) {
        logError(`Bad data: ${e.message}\n${response}`, e)
        return { kind: "bad_data", msg: `Bad data: ${e.message}\n${response}` }
      }
    }

    return { kind: "user_does_not_exist" }
  }

  /**
   * Register new user
   * 
   * Return @ok with @user when success
   * 
   * Return @unauthorized problem when the credential is not valid.
   * 
   * Return @user_already_exist problem when email registered
   * 
   * Return @failure with message problem when failure
   * 
   */
  async register(
    { email, password }: { email: string, password: string }
  ): Promise<{ kind: "ok"; user: User; credential: string } | AuthProblem> {
    try {
      // Hash password and check user email is existed
      const hash: string = await hashPassword(password)
      const findUserResponse = await sheetsonApi.usersSheet.findByEmail(email)
      // console.log(findUserResponse)

      if (findUserResponse.kind !== "ok") return getAuthProblem(findUserResponse)

      // If user email is existed return user_already_exist
      if (findUserResponse.usersRow) return { kind: "user_already_exist" }

      // Request create new row
      const response = await this._sheetsonApi.usersSheet
        .create({ email: email, password: hash })

      if (response.kind === "ok") {
        const usersRow = response.usersRow
        const user: User = mapUsersRowToUser(usersRow)
        return { kind: "ok", user, credential: `${usersRow.rowIndex}` }
      }

      return getAuthProblem(response)
    } catch (e) {
      logError(`Bad data: ${e.message}\n`, e)
      return { kind: "failure", msg: `${e.message}` }
    }
  }

  /**
   * Login user
   * 
   * Return @ok with @user when success
   * 
   * Return @user_does_not_exist problem when email or password not correct
   * 
   * Return @failure with message problem when failure
   * 
   */
  async login(
    { email, password }: { email: string, password: string }
  ): Promise<{ kind: "ok"; user: User, credential: string } | AuthProblem> {
    // find users row
    const response = await this._sheetsonApi.usersSheet
      .findByEmail(email)

    if (response.kind !== "ok") return getAuthProblem(response)

    // Return @user_does_not_exist problem when not found
    if (!response.usersRow) return { kind: "user_does_not_exist" }

    try {
      const { password: $hashPassword } = response.usersRow
      const isMatch = await comparePassword(password, $hashPassword)

      return !isMatch ? { kind: "user_does_not_exist" } : {
        kind: "ok",
        user: mapUsersRowToUser(response.usersRow),
        credential: `${response.usersRow.rowIndex}`
      }

    } catch (e) {
      console.log(`Bad data: ${e.message}\n${response}`)
      logError(`Bad data: ${e.message}\n${response}`, e)
      return { kind: "failure", msg: `${e.message}\n${response}` }
    }
  }

  /**
   * Fetch profile data for current user
   * 
   * Return @ok and set current user when fetch success
   * then current user profile is changed
   * 
   * Return @unauthorized problem when the credential is not valid.
   * 
   * Return @user_does_not_exist problem when user does not exist
   * 
   * Return @bad_data problem when parse raw data to user failure
   * 
   */
  async fetchProfile(): Promise<{ kind: "ok" } | AuthProblem> {
    const response = await this._getCurrentUserProfile()
    const user = response.kind === "ok" ? response.user : undefined

    // Set current user
    this._currentUser = user

    // return { kind: "failure" }
    return user ? { kind: "ok" } : response
  }

  /**
   * Update profile for current user
   * 
   * Return @ok with @user current user when fetch success,
   * then current user profile is changed
   * 
   * Return @unauthorized problem when the credential is not valid.
   * 
   * Return @user_does_not_exist problem when user does not exist
   * 
   * Return @bad_data problem when parse raw data to user failure
   * 
   */
  async updateProfile(user: User): Promise<{ kind: "ok"; user: User } | AuthProblem> {
    // Request handle update
    const response = await this._updateCurrentUserProfile(user)

    // Update current user
    this._currentUser = user

    return response
  }

  /**
   * Logout current user
   * 
   * Return @ok when logout success delete current user and credential
   * 
   * Return @unauthorized problem when the credential is not valid.
   */
  async logout(): Promise<{ kind: "ok" } | AuthProblem> {
    if (!this.isAuthenticated) return { kind: "unauthorized" }

    this._credential = undefined
    this._currentUser = undefined

    return { kind: "ok" }
  }
}

// Singleton instance of the AuthRepository for convenience
export const authRepository = new AuthRepository(sheetsonApi)

// const {
//   fullname,
//   nickname,
//   birthdate,
//   email,
//   country,
//   phone,
//   gender,
//   occupation,
// } = user