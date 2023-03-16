import { Article } from "../../types/article";
import { slicePrevSevenFromArray } from "../../utils/array";
import * as dateUtils from "../../utils/dates";

export type TotalTraffic = {
  hour: number;
  traffic: number;
}[];

export function getArticleTodayTrafficPerHour(article: Article): TotalTraffic {
  if (!article) return [];

  const currentDayNumber = dateUtils.getTodayDayNumber();
  const index = currentDayNumber - 1;
  const currentDayHourlyTraffic = article?.daily_traffic?.[index]?.hourly_traffic;

  return [...currentDayHourlyTraffic];
};

export function getArticleYesterdayTrafficPerHour(article: Article): TotalTraffic {
  if (!article) return [];

  const currentDayNumber = dateUtils.getYesterdayDayNumber();
  const index = currentDayNumber - 1;
  const currentDayHourlyTraffic = article?.daily_traffic?.[index]?.hourly_traffic;

  return [...currentDayHourlyTraffic];
};

export function getArticleLastSevenDaysTrafficPerHour(article: Article): TotalTraffic {
  if (!article) return [];

  const totalMonthArticle = getArticleMonthTrafficPerHour(article);
  const currentDayNumber = dateUtils.getTodayDayNumber();

  return slicePrevSevenFromArray(totalMonthArticle, currentDayNumber);
}

export function getArticleMonthTrafficPerHour(article: Article): TotalTraffic {
  if (!article) return [];

  const totalTraffic: { [hour: number]: number } = {};

  article?.daily_traffic?.forEach((dayTraffic) => {
    dayTraffic?.hourly_traffic?.forEach((hourTraffic) => {
      const hour = hourTraffic.hour;
      const traffic = hourTraffic.traffic;

      if (totalTraffic[hour]) {
        totalTraffic[hour] += traffic;
      } else {
        totalTraffic[hour] = traffic;
      }
    });
  });

  return Object.keys(totalTraffic).map((hourStr) => {
    const hour = parseInt(hourStr);

    return ({
      hour: hour,
      traffic: totalTraffic[hour]
    })
  });
}
