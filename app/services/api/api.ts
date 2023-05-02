/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApiResponse, // @demo remove-current-line
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem" // @demo remove-current-line
import type {
  ApiConfig,
  ApiFeedResponse,
  CategoriesResponse,
  CoursesResponse, // @demo remove-current-line
} from "./api.types"
import type { EpisodeSnapshotIn } from "../../models/Episode" // @demo remove-current-line
import { CategorySnapshotIn } from "../../features/category"
import { CourseSnapshotIn } from "../edu-api"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {

    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer eyJhcGlfa2V5IjoiMzg3OTdhY2Y5N2NmZjgzZjQxNGI5ODNiN2E2MjY3NmQifQ==",
      },
    })
  }

  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async getEpisodes(): Promise<{ kind: "ok"; episodes: EpisodeSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `api.json?rss_url=https%3A%2F%2Ffeeds.simplecast.com%2FhEI_f9Dx`, { limit: 5 }
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      const episodes: EpisodeSnapshotIn[] = rawData.items.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", episodes }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getCategories(): Promise<{ kind: "ok"; categories: CategorySnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<CategoriesResponse> = await this.apisauce.get(
      `https://api.simplecast.com/categories`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      const categories: CategorySnapshotIn[] = rawData.collection.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", categories }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getCourses(
    { limit, offset }: { limit?: number, offset?: number }
  ): Promise<
    { kind: "ok"; data: CourseSnapshotIn[]; total: number, current: number } | GeneralApiProblem
  > {
    // make the api call
    const response: ApiResponse<CoursesResponse> = await this.apisauce.get(
      `https://api.simplecast.com/podcasts?limit=${limit}&offset=${offset}`,
    )
    // const response: ApiResponse<CoursesResponse> = await this.apisauce.get(
    //   `https://api.simplecast.com/podcasts?limit=${4}?offset=${3}`,
    // )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      // console.log(response.data.collection.length)

      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      // const courses: CourseSnapshotIn[] = rawData.collection.map((raw) => ({
      //   ...raw,
      // }))

      const courses: CourseSnapshotIn[] = response.data.collection.map(({ id, title }) => ({
        id: id,
        title: title,
      }))

      return { kind: "ok", data: courses, total: rawData.pages.total, current: rawData.pages.current }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
