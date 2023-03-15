import { MonthTraffic } from "../../types/article";
import * as dateUtils from "../../utils/dates";

export function getTodayTrafficPerHour(monthTraffic: MonthTraffic) {
  const currentDayNumber = dateUtils.getTodayDayNumber();
  const hourTraffic = monthTraffic.find((dayTraffic) => {
    return dayTraffic.day === currentDayNumber;
  });

  return hourTraffic?.hourly_traffic;
}

export function getYesterdayTrafficPerHour(monthTraffic: MonthTraffic) {
  const currentDayNumber = dateUtils.getYesterdayDayNumber();
  const hourTraffic = monthTraffic.find((dayTraffic) => {
    return dayTraffic.day === currentDayNumber;
  });

  return hourTraffic?.hourly_traffic;
}
