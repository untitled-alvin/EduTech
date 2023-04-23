/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApisauceInstance,
  create,
} from "apisauce"
import type {
  SheetsonConfig
} from "./sheetson.types"
import { UsersSheet } from "./user/users-sheet"
import { CourseSheet } from "./course/course-sheet"
import { CategorySheet } from "./category/category-sheet"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_CONFIG: SheetsonConfig = {
  url: "https://api.sheetson.com/v2/",
  timeout: 10000,
  spreadsheetId: "1SZ6p11EmJUdlEzM3ufIshvWJDZzyvHoeFymjR3E78Fo",
  credential: "LBWsRX9HgcuA8tECKIuH1dcmDkH-Omd9BMbazr2cdcJLJqUx-hEQS45mPyk"
}

/**
 * Manages all requests to the Sheetson API.
 */
export class SheetsonApi {
  apisauce: ApisauceInstance
  config: SheetsonConfig
  usersSheet: UsersSheet
  categorySheet: CategorySheet
  courseSheet: CourseSheet

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: SheetsonConfig = DEFAULT_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.config.credential}`,
        "X-Sheetson-Spreadsheet-Id": `${this.config.spreadsheetId}`
      },
    })

    this.usersSheet = new UsersSheet(this.apisauce)
    this.categorySheet = new CategorySheet(this.apisauce)
    this.courseSheet = new CourseSheet(this.apisauce)
  }
}

// Singleton instance of the API for convenience
export const sheetsonApi = new SheetsonApi()
