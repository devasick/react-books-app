import { DATA_REQUESTED, SEND_CATEGORY } from "../constants/action-types";

export function getData() {
  return { type: DATA_REQUESTED };
}

export function sendCategory(category) {
  return { type: SEND_CATEGORY, category };
}
