/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface SheetsonError {
  code?: number;
  message?: string;
}

export interface BaseRow {
  rowIndex?: number;
}

export interface UsersRow extends BaseRow {
  email?: string;
  password?: string;
  fullname?: string;
  nickname?: string;
  birthdate?: string;
  country?: string;
  phone?: string;
  gender?: string;
  occupation?: string;
  avatar?: string;
}

export interface SourceRow extends BaseRow {
  email?: string;
  password?: string;
  fullname?: string;
  nickname?: string;
  birthdate?: string;
  country?: string;
  phone?: string;
  gender?: string;
  occupation?: string;
  avatar?: string;
}


export interface SheetsonListResponse<T> {
  results?: T[];
  hasNextPage: boolean;
}

export interface SheetsonCreateResponse extends BaseRow { }

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
