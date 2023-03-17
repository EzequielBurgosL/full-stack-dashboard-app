import { Article } from '../../types/article';
import { TimeRange } from '../../types/timeRange';
import {
  getArticleTraffic,
  TotalHourTraffic
} from '../filter/article';
import * as dateUtils from "../../utils/dates";
import { slicePrevSevenFromArray } from '../../utils/array';

export function totalArticlesTrafficPerHour(articles: Article[], timeRange: TimeRange) {
  if (!articles || !articles?.length) return [];

  let articlesTrafficPerHour: TotalHourTraffic = [];

  articles.forEach((article) => {
    const articleTrafficPerHour = getArticleTraffic[timeRange](article);

    articleTrafficPerHour.forEach((item, index) => {
      if (!articlesTrafficPerHour[index]) {
        const initialValue = {
          hour: item.hour,
          traffic: item.traffic
        };

        articlesTrafficPerHour[index] = initialValue;
      } else {
        articlesTrafficPerHour[index].traffic += item.traffic;
      }
    });
  });

  return articlesTrafficPerHour;
};

export function totalArticleTodayTraffic(article: Article): number {
  const currentDayNumber = dateUtils.getTodayDayNumber();
  const index = currentDayNumber - 1;
  const dayTraffic = article.daily_traffic[index];

  return dayTraffic?.hourly_traffic?.reduce((curr, acc) => curr += acc.traffic, 0);
};

export function totalArticleYesterdayTraffic(article: Article): number {
  const currentDayNumber = dateUtils.getYesterdayDayNumber();
  const index = currentDayNumber - 1;
  const dayTraffic = article.daily_traffic[index];

  return dayTraffic?.hourly_traffic?.reduce((curr, acc) => curr += acc.traffic, 0);
};

export function totalArticleMonthTraffic(article: Article, isWeek?: boolean): number {
  let dailyTraffic = article.daily_traffic;

  if (isWeek) {
    const currentDayNumber = dateUtils.getTodayDayNumber();

    dailyTraffic = slicePrevSevenFromArray(dailyTraffic, currentDayNumber);
  }

  const dailyTrafficArray = dailyTraffic.map((dayTraffic) => {
    return {
      day: dayTraffic.day,
      traffic: dayTraffic?.hourly_traffic?.reduce((curr, acc) => curr += acc.traffic, 0)
    }
  });

  return dailyTrafficArray.reduce((curr, acc) => curr += acc.traffic, 0);
};