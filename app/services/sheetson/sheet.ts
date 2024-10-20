/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApisauceInstance } from "apisauce"
import { SheetsonProblem, getSheetsonProblem } from "./sheetson-problem"
import uuid from 'react-native-uuid';

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

export type Row = {
  rowIndex: number,
  guid: string,
  create_time?: string,
  update_time?: string
}

export type D<T> = T & Row
export type UnAccessField<T extends Row> = Omit<T, 'rowIndex' | 'guid' | 'create_time' | 'update_time'>
export type Field<D> = keyof D
export type ListResponse<D> = { results: D[]; hasNextPage: boolean; }

export type NoneResult = { kind: "ok" }
export type SingleResult<D> = { kind: "ok"; data: D }
export type MultiResult<D> = { kind: "ok"; data: ListResponse<D> }
export type CreateParams<D> = Omit<D, 'rowIndex' | 'guid' | 'create_time' | 'update_time'>
export type UpdateParams<D> = { index: number } & Omit<D, 'rowIndex' | 'guid'>

// export type SearchWhere<T extends Row> = Map<Field<T>, any>
export type SearchWhereOperator = { [key in Operator]?: string; }
export type SearchWhere<D> = { [Property in keyof D]?: SearchWhereOperator | string }
export type SearchParams<D> = {
  skip?: number,
  limit?: number,
  order?: Field<D>,
  where?: SearchWhere<D>
}
export type ReadParams = { index: number | string }
export type DeleteParams = { index: number | string }

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
  abstract find({ }: SearchWhere<T>): Promise<SingleResult<T> | SheetsonProblem>
}

export class Sheet<T extends Row> extends ISheet<T> {
  apisauce: ApisauceInstance

  constructor(name: string, apisauce: ApisauceInstance) {
    super(name)
    this.apisauce = apisauce
  }

  async create(params: CreateParams<T>): Promise<SingleResult<T> | SheetsonProblem> {
    // Action
    const now = Date()
    const body = { guid: uuid.v4(), create_time: now, update_time: now, ...params }
    const response = await this.apisauce.post<T>(this.url, body)

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
    return { kind: "ok", data: response.data }
  }

  async update({ index, ...rest }: UpdateParams<T>): Promise<SingleResult<T> | SheetsonProblem> {
    // Action
    const now = Date()
    const body = { guid: uuid.v4(), update_time: now, ...rest }
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
    // console.log(this.url)
    // console.log(params)
    // Action
    const response = await this.apisauce.get<ListResponse<T>>(this.url, params)

    // Filter Problem
    if (!response.ok) { return getSheetsonProblem(response) }
    if (!response.data) { return { kind: "not-found" } }

    // Result
    return { kind: "ok", data: response.data }
  }

  async find(params: SearchWhere<T>): Promise<SingleResult<T> | SheetsonProblem> {
    // Action
    const response = await this.search({ limit: 1, skip: 0, where: params })

    // Filter Problem
    if (response.kind !== "ok") { return response }
    if (!response.data?.results?.length) { return { kind: "not-found" } }

    // Result
    return { kind: "ok", data: response.data.results[0] }
  }
}
