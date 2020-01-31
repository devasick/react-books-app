import {
  DATA_REQUESTED,
  SEND_CATEGORY,
  SEARCH
} from "../constants/action-types";

export function getData() {
  return { type: DATA_REQUESTED };
}

export function sendCategory(category) {
  return { type: SEND_CATEGORY, category };
}

export function search(value) {
  return { type: SEARCH, value };
}
