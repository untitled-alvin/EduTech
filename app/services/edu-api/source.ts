// /**
//  * This Api class lets you define an API endpoint and methods to request
//  * data and process it.
//  *
//  * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
//  * documentation for more details.
//  */
import { SheetsonApi } from "../sheetson";
import { CourseSnapshotIn, Page } from "./models";
import { ClientProblem } from "./problem";

export type CourseProblem = ClientProblem
export type SearchCourseParams = {
  skip?: number,
  limit?: number
} & { [Property in keyof CourseSnapshotIn]?: string }

// course: Sheet<Course>

// abstract class ICourseRepo {
//   // abstract search({ }: SearchParams<T>): Promise<MultiResult<T> | SheetsonProblem>
// }

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class CourseRepo {
  sheetsonApi: SheetsonApi

  /**
   * Inject ApisauceInstance
   */
  constructor(sheetsonApi: SheetsonApi) { this.sheetsonApi = sheetsonApi }

  /**
   * Find users row by email address
   * 
   */
  async search({ skip, limit, ...rest }: SearchCourseParams): Promise<
    { kind: "ok"; data: Page<CourseSnapshotIn> } | CourseProblem
  > {
    try {
      const response = await this.sheetsonApi.course.search({
        skip,
        limit,
        where: { ...rest },
      })

      if (response.kind === "ok") {
        const { results, hasNextPage } = response.data
        const courses: CourseSnapshotIn[] = results.map(({
          rowIndex,
          original_price,
          promotion_price,
          certificate, ...rest }) => {
          return {
            ...rest,
            id: rowIndex?.toString(),
            original_price: +original_price,
            promotion_price: +promotion_price,
            certificate: certificate === "TRUE" ? true : false
          }
        })

        return { kind: "ok", data: { results: courses, hasNextPage: hasNextPage } }
      }

      return response
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e}\n`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}
