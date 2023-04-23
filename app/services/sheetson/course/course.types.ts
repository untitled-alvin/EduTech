/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

import { BaseRow } from "../sheetson.types";

export interface CourseRow extends BaseRow {
  name?: string;
  keyword?: string;
  description?: string;
  category?: string;
  original_price?: string;
  promotion_price?: string;
  country?: string;
  duration?: string;
  certificate?: string;
  intro?: string;
  banner?: string;
}
