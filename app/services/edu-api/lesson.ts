// /**
//  * This Api class lets you define an API endpoint and methods to request
//  * data and process it.
//  *
//  * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
//  * documentation for more details.
//  */
import { SheetsonApi } from "../sheetson";
import { LessonSnapshotIn, Page } from "./models";
import { ClientProblem } from "./problem";

export type LessonProblem = ClientProblem

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class LessonRepo {
  sheetsonApi: SheetsonApi

  /**
   * Inject ApisauceInstance
   */
  constructor(sheetsonApi: SheetsonApi) { this.sheetsonApi = sheetsonApi }

  /**
   * Find users row by email address
   * 
   */
  async search({ }): Promise<{ kind: "ok"; data: Page<LessonSnapshotIn> } | LessonProblem> {
    try {
      // const response = await this.sheetsonApi.lesson.search(
      //   { order:"index", where: { source_index: { "$eq": "1" } } })
      const response = await this.sheetsonApi.lesson.search(
        { order: "index", where: { course_index: { $eq: "1" } } })

      if (response.kind === "ok") {
        const { results, hasNextPage } = response.data
        const lessons: LessonSnapshotIn[] = results.map(
          ({ rowIndex, index, course_index, duration, ...rest }) => ({
            ...rest,
            duration: +duration,
            course_index: +course_index,
            index: +index,
            id: rowIndex.toString(),
          })
        )

        return { kind: "ok", data: { results: lessons, hasNextPage: hasNextPage } }
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
