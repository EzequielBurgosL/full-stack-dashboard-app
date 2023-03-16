import devDataset from "../dataset.json";
import testDataset from "../fixtures/test-dataset";
import { Article } from "../types/article";
import { TimeRange } from "../types/timeRange";
import { getArticleMonthTrafficPerHour, getArticleLastSevenDaysTrafficPerHour } from "./aggregation";
import { getTodayTrafficPerHour, getYesterdayTrafficPerHour } from "./helpers";

const localDataset = process.env.NODE_ENV === 'test' ? testDataset : devDataset;

type ProcessedArticle = Partial<Article> & {
  timeRange?: string;
  data?: number[];
  labels?: string[];
  totalTraffic?: number;
}

class Database {
  private trafficData: Article[] = localDataset.traffic_data;

  findOneByTimeRange(id: number, timeRange: string): ProcessedArticle | null {
    if (!id || typeof id !== 'number' || id < 0) {
      console.log('wrong id, received: ', id);
      return null;
    }

    const article = this.trafficData[id - 1];

    if (!article) {
      console.log('article was not found');
      return null;
    }

    let data: number[] | undefined;
    let labels: string[] | undefined;
    let traffic;

    if (timeRange === TimeRange.YESTERDAY) {
      traffic = getYesterdayTrafficPerHour(article.daily_traffic);
    } else if (timeRange === TimeRange.WEEK) {
      traffic = getArticleLastSevenDaysTrafficPerHour(article.daily_traffic)
    } else if (timeRange === TimeRange.MONTH) {
      traffic = getArticleMonthTrafficPerHour(article.daily_traffic);
    } else {
      traffic = getTodayTrafficPerHour(article.daily_traffic);
    }

    labels = traffic?.map(item => `${item.hour}`.padStart(2, '0'));
    data = traffic?.map(item => item.traffic);
    const totalTraffic = traffic?.reduce((prev, curr) => prev += curr.traffic, 0);

    return {
      id: article.id,
      url: article.url,
      author: article.author,
      image_url: article.image_url,
      timeRange,
      data,
      labels,
      totalTraffic
    };
  }
}

const database = new Database();

export default database;