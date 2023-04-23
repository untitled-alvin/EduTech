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
import { CourseRow } from "./course.types";

const courseURL = `sheets/course/`

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class CourseSheet {
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
    limit, skip,
    // order, category
  }): Promise<{ kind: "ok"; data: SheetsonListResponse<CourseRow> } | SheetsonProblem> {
    const params = {
      limit: limit,
      skip: skip,
      // order: order,
      // where: { "email": { "$eq": `${category}` } }
    }
    const response: ApiResponse<SheetsonListResponse<CourseRow>> = await this.apisauce.get(
      courseURL, params
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
    kind: "ok"; courseRow: CourseRow
  } | SheetsonProblem> {
    const uri = `${courseURL}${rowIndex}`
    const response: ApiResponse<SheetsonListResponse<CourseRow>> = await this.apisauce.get(uri)

    if (!response.ok) {
      const problem = getSheetsonProblem(response)
      if (problem) return problem
    }

    const courseRow = response.data?.results[0]
    return courseRow ? { kind: "ok", courseRow } : { kind: "not-found" }
  }
}
