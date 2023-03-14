import { MonthTraffic } from "../../types/article";
import * as dateUtils from "../../utils/dates";

export function getTodayDailyTraffic(monthTraffic: MonthTraffic) {
  const currentDayNumber = dateUtils.getTodayDayNumber();
  const hourTraffic = monthTraffic.find((dayTraffic) => {
    return dayTraffic.day === currentDayNumber;
  });

  return hourTraffic;
}

export function getYesterdayDailyTraffic(monthTraffic: MonthTraffic) {
  const currentDayNumber = dateUtils.getYesterdayDayNumber();
  const hourTraffic = monthTraffic.find((dayTraffic) => {
    return dayTraffic.day === currentDayNumber;
  });

  return hourTraffic;
}
