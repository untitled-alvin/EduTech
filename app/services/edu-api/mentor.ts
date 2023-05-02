import { SheetsonApi } from "../sheetson";
import { MentorSnapshotIn, Page } from "./models";
import { ClientProblem } from "./problem";

export type MentorProblem = ClientProblem

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class MentorRepo {
  sheetsonApi: SheetsonApi

  /**
   * Inject ApisauceInstance
   */
  constructor(sheetsonApi: SheetsonApi) { this.sheetsonApi = sheetsonApi }

  /**
   * Find top mentors
   * 
   */
  async topMentor(
    { skip, limit }: { skip?: number, limit?: number }
  ): Promise<{ kind: "ok"; data: Page<MentorSnapshotIn> } | MentorProblem> {
    try {
      const params = { skip: skip, limit: limit, where: { role: { "$eq": "mentor" } } }
      const response = await this.sheetsonApi.usersSheet.search(params)

      if (response.kind === "ok") {
        const { results, hasNextPage } = response.data
        const mentors: MentorSnapshotIn[] = results.map(
          ({ rowIndex, ...rest }) => ({ uid: `${rowIndex}`, ...rest }))

        return { kind: "ok", data: { results: mentors, hasNextPage: hasNextPage } }
      }

      return response
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e}\n`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Find top mentors
   * 
   */
  async read(
    { index }: { index: number }
  ): Promise<{ kind: "ok"; data: MentorSnapshotIn } | MentorProblem> {
    try {
      const response = await this.sheetsonApi.user.read({ index })

      if (response.kind === "ok") {
        const { rowIndex, ...rest } = response.data
        const mentor: MentorSnapshotIn = { uid: rowIndex?.toString(), ...rest }

        return { kind: "ok", data: mentor }
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