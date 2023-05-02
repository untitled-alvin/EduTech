// /**
//  * This Api class lets you define an API endpoint and methods to request
//  * data and process it.
//  *
//  * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
//  * documentation for more details.
//  */
import { SheetsonApi } from "../sheetson";
import { CategorySnapshotIn, Page } from "./models";
import { ClientProblem } from "./problem";

export type CategoryProblem = ClientProblem

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class CategoryRepo {
  sheetsonApi: SheetsonApi

  /**
   * Inject ApisauceInstance
   */
  constructor(sheetsonApi: SheetsonApi) { this.sheetsonApi = sheetsonApi }

  /**
   * Find users row by email address
   * 
   */
  async search({ }): Promise<{ kind: "ok"; data: Page<CategorySnapshotIn> } | CategoryProblem> {
    try {
      const response = await this.sheetsonApi.category.search({})

      if (response.kind === "ok") {
        const { results, hasNextPage } = response.data
        const categories: CategorySnapshotIn[] = results.map((raw) => ({ ...raw }))

        return { kind: "ok", data: { results: categories, hasNextPage: hasNextPage } }
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
