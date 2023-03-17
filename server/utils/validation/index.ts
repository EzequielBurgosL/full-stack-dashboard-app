import { TimeRange } from "../../types/timeRange";

export function isValidId(id: number) {
  if (id && typeof id === 'number' && id > 0) {
    return true;
  }

  return false;
}

export function isValidTimeRange(timeRange: TimeRange) {
  if (Object.values(TimeRange).includes(timeRange)) {
    return true;
  }

  return false;
}