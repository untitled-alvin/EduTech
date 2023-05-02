/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

import { Row } from "../sheet";

export interface UsersRow extends Row {
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
