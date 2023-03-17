import { Article } from '../../types/article';
import { TimeRange } from '../../types/timeRange';
import {
  getArticleTraffic,
  TotalTraffic
} from '../filter/article';
import * as dateUtils from "../../utils/dates";
import { slicePrevSevenFromArray } from '../../utils/array';

export function getArticlesTraffic(articles: Article[], timeRange: TimeRange) {
  if (!articles || !articles?.length) return [];

  let articlesTraffic: TotalTraffic = [];
  const time = timeRange === TimeRange.MONTH || timeRange === TimeRange.WEEK ?
    'day': 'hour';

  articles.forEach((article) => {
    const articleTraffic = getArticleTraffic[timeRange](article);

    articleTraffic.forEach((item, index) => {
      if (!articlesTraffic[index]) {
        const initialValue = {
          [time]: item[time],
          traffic: item.traffic
        };

        articlesTraffic[index] = initialValue;
      } else {
        articlesTraffic[index].traffic += item.traffic;
      }
    });
  });

  return articlesTraffic;
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