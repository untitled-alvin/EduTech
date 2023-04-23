/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

import { BaseRow } from "../sheetson.types";

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
