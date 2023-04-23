import { SheetsonProblem } from "../../../services/sheetson/sheetson-problem";

export type AuthProblem =
  /**
   * Times up.
   */
  | { kind: "failure"; msg?: string }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized" }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "user_already_exist" }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "user_does_not_exist" }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; msg?: string }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad_data", msg?: string }

/**
 * Convert SheetsonProblem to AuthProblem
 *
 * @param problem The Sheetson Problem.
 */
// export function getAuthProblem(problem: SheetsonProblem): AuthProblem | void {
export function getAuthProblem(problem: SheetsonProblem): AuthProblem {
  return { kind: "failure", msg: problem.kind }
}