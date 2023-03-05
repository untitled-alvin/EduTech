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
  SourceRow,
} from "./sheetson.types"
import { getSheetsonProblem, SheetsonProblem } from "./sheetsonProblem";

const userURL = `sheets/source/`

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class SourceSheet {
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
  async search({
    limit, skip, order, category
  }): Promise<{ kind: "ok"; response: SheetsonListResponse<SourceRow> } | SheetsonProblem> {
    const params = {
      limit: limit,
      skip: skip,
      order: order,
      where: { "email": { "$eq": `${category}` } }
    }
    const response: ApiResponse<SheetsonListResponse<SourceRow>> = await this.apisauce.get(
      userURL, params
    )

    if (!response.ok) {
      const problem = getSheetsonProblem(response)
      if (problem) return problem
    }

    const responseData = response.data
    return responseData ? { kind: "ok", response: response.data } : { kind: "not-found" }
  }

  /**
   * Find users row by rowIndex
   */
  async findByRowIndex(rowIndex: number): Promise<{
    kind: "ok"; sourceRow: SourceRow
  } | SheetsonProblem> {
    const uri = `${userURL}${rowIndex}`
    const response: ApiResponse<SheetsonListResponse<SourceRow>> = await this.apisauce.get(uri)

    if (!response.ok) {
      const problem = getSheetsonProblem(response)
      if (problem) return problem
    }

    const sourceRow = response.data?.results[0]
    return sourceRow ? { kind: "ok", sourceRow } : { kind: "not-found" }
  }
}
