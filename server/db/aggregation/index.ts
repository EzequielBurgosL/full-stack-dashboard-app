import { MonthTraffic, Article } from "../../types/article";

type TotalMonthTraffic = {
  hour: number;
  totalTraffic: number;
}[];

export const monthTrafficPerHour = (monthTraffic: MonthTraffic): TotalMonthTraffic => {
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
      totalTraffic: totalTraffic[hour]
    })
  });
}

export const totalMonthTrafficPerHour = (articles: Article[]) => {
  let result: TotalMonthTraffic = [];

  articles.forEach((article) => {
    const totalMonthArticle = monthTrafficPerHour(article.daily_traffic);

    if (!result.length) {
      result = totalMonthArticle;
      return;
    }

    totalMonthArticle.forEach((totalDay, index) => {
      result[index].totalTraffic += totalDay.totalTraffic;
    });
  });

  return result;
}