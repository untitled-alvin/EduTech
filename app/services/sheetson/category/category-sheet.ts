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
import { CategoryRow } from "./category.types";

const URL = `sheets/category/`

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class CategorySheet {
  apisauce: ApisauceInstance

  /**
   * Inject ApisauceInstance
   */
  constructor(apisauce: ApisauceInstance) {
    this.apisauce = apisauce
  }

  /**
   * Find users row by email address
   * 
   */
  async search(
    { limit, skip, }: { limit?: number, skip?: number }
  ): Promise<{ kind: "ok"; data: SheetsonListResponse<CategoryRow> } | SheetsonProblem> {
    const params = {
      limit: limit,
      skip: skip,
      // order: order,
    }
    const response: ApiResponse<SheetsonListResponse<CategoryRow>> = await this.apisauce.get(
      URL, params
    )

    if (!response.ok) {
      const problem = getSheetsonProblem(response)
      if (problem) return problem
    }

    const responseData = response.data

    return responseData ? { kind: "ok", data: response.data } : { kind: "not-found" }
  }

  /**
   * Find users row by rowIndex
   */
  async findByRowIndex(rowIndex: number): Promise<{
    kind: "ok"; courseRow: CategoryRow
  } | SheetsonProblem> {
    const uri = `${URL}${rowIndex}`
    const response: ApiResponse<SheetsonListResponse<CategoryRow>> = await this.apisauce.get(uri)

    if (!response.ok) {
      const problem = getSheetsonProblem(response)
      if (problem) return problem
    }

    const courseRow = response.data?.results[0]
    return courseRow ? { kind: "ok", courseRow } : { kind: "not-found" }
  }
}
