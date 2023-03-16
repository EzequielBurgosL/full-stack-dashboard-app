import { MonthTraffic, Article } from "../../types/article";
import { slicePrevSevenFromArray } from "../../utils/array";
import * as dateUtils from "../../utils/dates";

type TotalMonthTraffic = {
  hour: number;
  traffic: number;
}[];

export function getArticleMonthTrafficPerHour(monthTraffic: MonthTraffic): TotalMonthTraffic {
  const totalTraffic: { [hour: number]: number } = {};

  monthTraffic.forEach((dayTraffic) => {
    dayTraffic.hourly_traffic.forEach((hourTraffic) => {
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

export function getArticleLastSevenDaysTrafficPerHour(dailyTraffic: MonthTraffic) {
  const totalMonthArticle = getArticleMonthTrafficPerHour(dailyTraffic);
  const currentDayNumber = dateUtils.getTodayDayNumber();

  return slicePrevSevenFromArray(totalMonthArticle, currentDayNumber);
}

export function totalArticlesMonthTrafficPerHour(articles: Article[]) {
  let result: TotalMonthTraffic = [];

  articles.forEach((article) => {
    const totalMonthArticle = getArticleMonthTrafficPerHour(article.daily_traffic);

    if (!result.length) {
      result = totalMonthArticle;
      return;
    }

    totalMonthArticle.forEach((totalDay, index) => {
      result[index].traffic += totalDay.traffic;
    });
  });

  return result;
}