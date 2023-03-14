import devDataset from "../dataset.json";
import testDataset from "../fixtures/test-dataset";
import { Article, DayTraffic } from "../types/article";
import { TimeRange } from "../types/timeRange";
import { getTodayDailyTraffic, getYesterdayDailyTraffic } from "./helpers";

const localDataset = process.env.NODE_ENV === 'test' ? testDataset : devDataset;

type ProcessedArticle = Partial<Article> & {
  timeRange?: string;
  data?: number[];
  labels?: string[];
}

class Database {
  private trafficData: Article[] = localDataset.traffic_data;

  findOneByTimeRange(id: number, timeRange: string): ProcessedArticle | null {
    if(!id || typeof id !== 'number' || id < 0) {
      console.error('wrong id, received: ', id);

      return null;
    }

    const article = this.trafficData[id - 1];

    if (!article) {
      console.error('article was not found');

      return null;
    }

    let data: number[] | undefined;
    let labels: string[] | undefined;

    if (timeRange === TimeRange.YESTERDAY) {
      const dayTraffic: DayTraffic | undefined = getYesterdayDailyTraffic(
        article.daily_traffic
      );

      labels = dayTraffic?.hourly_traffic.map(item => `${item.hour}`.padStart(2, '0'));
      data = dayTraffic?.hourly_traffic.map(item => item.traffic);
    } else if (timeRange === TimeRange.WEEK) {
      return article;
    } else if (timeRange === TimeRange.MONTH) {
      return article;
    } else {
      const dayTraffic: DayTraffic | undefined = getTodayDailyTraffic(
        article.daily_traffic
      );

      labels = dayTraffic?.hourly_traffic.map(item => `${item.hour}`.padStart(2, '0'));
      data = dayTraffic?.hourly_traffic.map(item => item.traffic);
    }

    return {
      id: article.id,
      url: article.url,
      author: article.author,
      image_url: article.image_url,
      timeRange: timeRange,
      data: data,
      labels: labels
    };
  }
}

const database = new Database();

export default database;