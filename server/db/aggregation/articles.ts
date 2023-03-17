import { Article } from '../../types/article';
import { TimeRange } from '../../types/timeRange';
import {
  getArticleTraffic,
  TotalTraffic
} from '../filter/article';

export function totalArticlesTrafficPerHour(articles: Article[], timeRange: TimeRange) {
  if (!articles || !articles?.length) return [];

  let articlesTrafficPerHour: TotalTraffic = [];

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
}