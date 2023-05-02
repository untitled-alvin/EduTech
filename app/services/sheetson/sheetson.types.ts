/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface SheetsonError {
  code?: number;
  message?: string;
}

/**
 * The options used to configure apisauce.
 */
export interface SheetsonConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number

  /**
   * Spreadsheet Id
   */
  spreadsheetId: string

  /**
   * Bearer token to access
   */
  credential: string
}
