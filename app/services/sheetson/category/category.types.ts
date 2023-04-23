/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

import { BaseRow } from "../sheetson.types";

export interface CategoryRow extends BaseRow {
  value?: string;
  rss_label?: string;
  label?: string;
  ic?: string;
}
