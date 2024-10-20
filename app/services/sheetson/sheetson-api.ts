/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce"
import type { SheetsonConfig } from "./sheetson.types"
import { Row, Sheet } from "./sheet"

export type Category = {
  value?: string;
  rss_label?: string;
  label?: string;
  ic?: string;
} & Row

export type Course = {
  name?: string;
  keyword?: string;
  type?: string;
  description?: string;
  category?: string;
  original_price?: string;
  promotion_price?: string;
  country?: string;
  duration?: string;
  certificate?: string;
  mentor_index?: string;
  intro?: string;
  banner?: string;
} & Row

export type Lesson = {
  course_index?: string;
  index?: string;
  name?: string;
  duration?: string;
  section?: string;
} & Row

export type Review = {
  user_index?: string;
  course_index?: string;
  content?: string;
  create_time?: string;
  rate?: string;
} & Row

export type Interact = {
  user_index: string;
  review_index: string;
  content?: string;
  type?: string;
  create_time?: string;
} & Row

export type User = {
  email?: string;
  password?: string;
  fullname?: string;
  nickname?: string;
  birthdate?: string;
  country?: string;
  phone?: string;
  role?: string;
  gender?: string;
  occupation?: string;
  avatar?: string;
} & Row

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
  readonly apisauce: ApisauceInstance
  readonly config: SheetsonConfig
  readonly user: Sheet<User>
  readonly category: Sheet<Category>
  readonly course: Sheet<Course>
  readonly lesson: Sheet<Lesson>
  readonly review: Sheet<Review>
  readonly interact: Sheet<Interact>

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

    this.user = new Sheet<User>("user", this.apisauce)
    this.category = new Sheet<Category>("category", this.apisauce)
    this.course = new Sheet<Course>("course", this.apisauce)
    this.lesson = new Sheet<Course>("lesson", this.apisauce)
    this.review = new Sheet<Review>("review", this.apisauce)
    this.interact = new Sheet<Interact>("interact", this.apisauce)
  }
}

// Singleton instance of the API for convenience
export const sheetsonApi = new SheetsonApi()