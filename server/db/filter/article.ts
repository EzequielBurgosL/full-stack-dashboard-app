import { Article } from "../../types/article";
import { TimeRange } from "../../types/timeRange";
import { slicePrevSevenFromArray } from "../../utils/array";
import * as dateUtils from "../../utils/dates";

export type TotalHourTraffic = {
  hour: number;
  traffic: number;
}[];

export type TotalDayTraffic = {
  day: number;
  traffic: number;
};

type GetArticleTrafficType = {
  [key in TimeRange]: (article: Article) => TotalHourTraffic;
};

export const getArticleTraffic: GetArticleTrafficType = {
  [TimeRange.TODAY]: getArticleTodayTrafficPerHour,
  [TimeRange.YESTERDAY]: getArticleYesterdayTrafficPerHour,
  [TimeRange.WEEK]: getArticleLastSevenDaysTrafficPerHour,
  [TimeRange.MONTH]: getArticleMonthTrafficPerHour
};

export function getArticleTodayTrafficPerHour(article: Article): TotalHourTraffic {
  if (!article) return [];

  const currentDayNumber = dateUtils.getTodayDayNumber();
  const index = currentDayNumber - 1;
  const currentDayHourlyTraffic = article?.daily_traffic?.[index]?.hourly_traffic;

  return [...currentDayHourlyTraffic];
};

export function getArticleYesterdayTrafficPerHour(article: Article): TotalHourTraffic {
  if (!article) return [];

  const currentDayNumber = dateUtils.getYesterdayDayNumber();
  const index = currentDayNumber - 1;
  const currentDayHourlyTraffic = article?.daily_traffic?.[index]?.hourly_traffic;

  return [...currentDayHourlyTraffic];
};

export function getArticleLastSevenDaysTrafficPerHour(article: Article): TotalHourTraffic {
  if (!article) return [];

  const totalMonthArticle = getArticleMonthTrafficPerHour(article);
  const currentDayNumber = dateUtils.getTodayDayNumber();

  return slicePrevSevenFromArray(totalMonthArticle, currentDayNumber);
};

export function getArticleMonthTrafficPerHour(article: Article): TotalHourTraffic {
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
};
