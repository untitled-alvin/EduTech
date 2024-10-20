import { Review, SheetsonApi } from "../sheetson";
import { SearchParams } from "../sheetson/sheet";
import { ReviewSnapshotIn, Page } from "./models";
import { ClientProblem } from "./problem";

export type ReviewProblem = ClientProblem

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class ReviewService {
  sheetsonApi: SheetsonApi

  /**
   * Inject ApisauceInstance
   */
  constructor(sheetsonApi: SheetsonApi) { this.sheetsonApi = sheetsonApi }

  /**
   * Find top mentors
   * 
   */
  async search(
    params: SearchParams<Review>
  ): Promise<{ kind: "ok"; data: Page<ReviewSnapshotIn> } | ReviewProblem> {
    try {
      const response = await this.sheetsonApi.review.search(params)

      if (response.kind === "ok") {
        const { results, hasNextPage } = response.data
        const reviews: ReviewSnapshotIn[] = results.map(
          ({ rowIndex,
            user_index,
            course_index,
            create_time,
            rate,
            ...rest }) => {
            return ({
              uid: `${rowIndex}`,
              user_index: +user_index,
              course_index: +course_index,
              create_time: new Date(create_time),
              rate: +rate,
              ...rest
            });
          }
        )

        return { kind: "ok", data: { results: reviews, hasNextPage: hasNextPage } }
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