import { SheetsonProblem } from "../sheetson/sheetson-problem";

export type Problem =
  /**
   * Times up.
   */
  | { kind: "failure"; msg?: string }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized" }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; msg?: string }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad_data", msg?: string }


export type ClientProblem =
  | { kind: "failure"; msg?: string }
  | { kind: "unknown"; msg?: string } | SheetsonProblem

/**
 * Convert SheetsonProblem to Problem
 *
 * @param problem The Sheetson Problem.
 */
// export function getProblem(problem: SheetsonProblem): Problem | void {
export function getProblem(problem: SheetsonProblem): Problem {
  return { kind: "failure", msg: problem.kind }
}