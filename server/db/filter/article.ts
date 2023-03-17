import { Article } from "../../types/article";
import { TimeRange } from "../../types/timeRange";
import { slicePrevSevenFromArray } from "../../utils/array";
import * as dateUtils from "../../utils/dates";

export type TotalTraffic = {
  [key: string]: number;
  traffic: number;
}[];

type GetArticleTrafficType = {
  [key in TimeRange]: (article: Article) => TotalTraffic;
};

export const getArticleTraffic: GetArticleTrafficType = {
  [TimeRange.TODAY]: getArticleTodayTrafficPerHour,
  [TimeRange.YESTERDAY]: getArticleYesterdayTrafficPerHour,
  [TimeRange.WEEK]: getArticleLastSevenDaysTrafficPerDay,
  [TimeRange.MONTH]: getArticleMonthTrafficPerDay
};

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

export function getArticleLastSevenDaysTrafficPerDay(article: Article): TotalTraffic {
  if (!article) return [];

  const totalMonthArticle = getArticleMonthTrafficPerDay(article);
  const currentDayNumber = dateUtils.getTodayDayNumber();

  return slicePrevSevenFromArray(totalMonthArticle, currentDayNumber);
};

export function getArticleMonthTrafficPerDay(article: Article): TotalTraffic {
  if (!article) return [];

  return article?.daily_traffic?.map((dayTraffic) => {
    return {
      day: dayTraffic.day,
      traffic: dayTraffic?.hourly_traffic?.reduce((curr, acc) => curr += acc.traffic, 0)
    }
  });
};
