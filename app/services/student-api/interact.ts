import { Interact, SheetsonApi } from "../sheetson";
import { SearchParams } from "../sheetson/sheet";
import { InteractSnapshotIn, Page } from "./models";
import { ClientProblem } from "./problem";

export type InteractProblem = ClientProblem

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class InteractService {
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
    params: SearchParams<Interact>
  ): Promise<{ kind: "ok"; data: Page<InteractSnapshotIn> } | InteractProblem> {
    try {
      const response = await this.sheetsonApi.interact.search(params)

      if (response.kind === "ok") {
        const { results, hasNextPage } = response.data
        const reviews: InteractSnapshotIn[] = results.map(
          ({ rowIndex,
            user_index,
            review_index,
            create_time,
            ...rest }) => {
            return ({
              uid: `${rowIndex}`,
              user_index: +user_index,
              review_index: +review_index,
              create_time: new Date(create_time),
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