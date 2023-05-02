/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApisauceInstance } from "apisauce"
import { SheetsonProblem, getSheetsonProblem } from "./sheetson-problem"

export enum Operator {
  //	Less Than
  "$lt" = "$lt",

  // $lte	Less Than or Equal To
  "$lte" = "$lte",

  // $gt	Greater Than
  "$gt" = "$gt",

  // $gte	Greater Than or Equal To
  "$gte" = "$gte",

  // $eq	Equal To
  "$eq" = "$eq",

  // $neq	Not Equal To
  "$neq" = "$neq",

  // $text	Search for specific text(not case -sensitive)
  "$text" = "$text",
}
export type Row = { rowIndex: number, }
export type Field<T extends Row> = keyof T
export type ListResponse<T extends Row> = { results: T[]; hasNextPage: boolean; }

export type NoneResult = { kind: "ok" }
export type SingleResult<T extends Row> = { kind: "ok"; data: T }
export type MultiResult<T extends Row> = { kind: "ok"; data: ListResponse<T> }

export type CreateParams<T extends Row> = {} & Omit<T, 'rowIndex'>
export type UpdateParams<T extends Row> = { index: number, params } & Omit<T, 'rowIndex'>

// export type SearchWhere<T extends Row> = Map<Field<T>, any>
export type SearchWhereOperator = { [key in Operator]?: string; }
export type SearchWhere<T extends Row> = { [Property in keyof T]?: SearchWhereOperator | string }
export type SearchParams<T extends Row> = {
  skip?: number,
  limit?: number,
  order?: Field<T>,
  where?: SearchWhere<T>
}
export type ReadParams = { index: number }
export type DeleteParams = { index: number }

abstract class ISheet<T extends Row> {
  name: string
  url: string

  protected constructor(name: string) {
    this.name = name
    this.url = `/sheets/${name}/`
  }

  abstract create({ }: CreateParams<T>): Promise<SingleResult<T> | SheetsonProblem>
  abstract update({ }: UpdateParams<T>): Promise<SingleResult<T> | SheetsonProblem>
  abstract delete({ }: DeleteParams): Promise<NoneResult | SheetsonProblem>
  abstract search({ }: SearchParams<T>): Promise<MultiResult<T> | SheetsonProblem>
  abstract read({ }: ReadParams): Promise<SingleResult<T> | SheetsonProblem>
}

export class Sheet<T extends Row> extends ISheet<T> {
  apisauce: ApisauceInstance

  constructor(name: string, apisauce: ApisauceInstance) {
    super(name)
    this.apisauce = apisauce
  }

  async create(params: CreateParams<T>): Promise<SingleResult<T> | SheetsonProblem> {
    // Action
    const response = await this.apisauce.post<T>(this.url, { params })

    // Filter Problem
    if (!response.ok) { return getSheetsonProblem(response) }

    // Result
    return { kind: "ok", data: response.data }
  }

  async read({ index }: ReadParams): Promise<SingleResult<T> | SheetsonProblem> {
    // Action
    const response = await this.apisauce.get<T>(`${this.url}${index}`)

    // Filter Problem
    if (!response.ok) { return getSheetsonProblem(response) }
    if (!response.data) { return { kind: "not-found" } }

    // Result
    return { kind: "ok", data: response?.data }
  }

  async update({ index, ...rest }: UpdateParams<T>): Promise<SingleResult<T> | SheetsonProblem> {
    // Action
    const response = await this.apisauce.put<T>(`${this.url}${index}`, rest)

    // Filter Problem
    if (!response.ok) { return getSheetsonProblem(response) }
    if (!response.data) { return { kind: "bad-data" } }

    // Result
    return { kind: "ok", data: response.data }
  }

  async delete({ index }: DeleteParams): Promise<NoneResult | SheetsonProblem> {
    // Action
    const response = await this.apisauce.delete(`${this.url}${index}`)

    // Filter Problem
    if (!response.ok) { return getSheetsonProblem(response) }

    // Result
    return { kind: "ok" }
  }

  async search(params: SearchParams<T>): Promise<MultiResult<T> | SheetsonProblem> {
    // Action
    console.log(params)
    const response = await this.apisauce.get<ListResponse<T>>(this.url, params)

    // Filter Problem
    if (!response.ok) { return getSheetsonProblem(response) }
    if (!response.data) { return { kind: "not-found" } }

    // Result
    return { kind: "ok", data: response.data }
  }
}
