/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApiResponse,
  ApisauceInstance,
} from "apisauce"
import type {
  SheetsonListResponse,
} from "../sheetson.types"
import { getSheetsonProblem, SheetsonProblem } from "../sheetson-problem";
import { UsersRow } from "./user.types";

const userURL = `sheets/users/`

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class UsersSheet {
  apisauce: ApisauceInstance

  /**
   * Inject ApisauceInstance
   */
  constructor(apisauce: ApisauceInstance) {
    this.apisauce = apisauce
  }

  /**
   * Find users row by email address
   */
  async findByEmail(email: string): Promise<{ kind: "ok"; usersRow?: UsersRow } | SheetsonProblem> {
    const params = { limit: 1, where: { "email": { "$eq": `${email}` } } }
    const response: ApiResponse<SheetsonListResponse<UsersRow>> = await this.apisauce.get(
      userURL, params
    )

    if (!response.ok) {
      const problem = getSheetsonProblem(response)
      if (problem) return problem
    }

    if (response.data?.results?.length) {
      const usersRow = response.data?.results[0]
      return { kind: "ok", usersRow: usersRow }
    }

    return { kind: "ok", usersRow: undefined }
  }

  /**
   * Find users row by rowIndex
   */
  async findByRowIndex(rowIndex: number): Promise<{ kind: "ok"; usersRow?: UsersRow } | SheetsonProblem> {
    const response: ApiResponse<UsersRow> = await this.apisauce.get(
      `${userURL}${rowIndex}`,
    )

    if (!response.ok) {
      const problem = getSheetsonProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", usersRow: response.data }
  }

  /**
   * Create users row
   */
  async create(usersRow: UsersRow): Promise<{ kind: "ok"; usersRow?: UsersRow } | SheetsonProblem> {
    const params = usersRow
    const response: ApiResponse<UsersRow> = await this.apisauce.post(userURL, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getSheetsonProblem(response)
      if (problem) return problem
    }

    return { kind: "ok", usersRow: response.data }
  }

  /**
   * Update users row
   */
  async update(usersRow: UsersRow): Promise<{ kind: "ok"; usersRow: UsersRow } | SheetsonProblem> {
    // make the api call
    const params = usersRow
    const response: ApiResponse<UsersRow> = await this.apisauce.put(
      `${userURL}${params.rowIndex}`, params)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getSheetsonProblem(response)
      if (problem) return problem
    }

    return response.data ? { kind: "ok", usersRow: response.data } : { kind: "bad-data" }
  }
}
