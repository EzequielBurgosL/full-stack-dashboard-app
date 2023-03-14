import dataset from "../dataset.json";
import testDataset from "../fixtures/test-dataset";
import { Article, DayTraffic } from "../types/article";
import { TimeRange } from "../types/timeRange";
import { getTodayDailyTraffic, getYesterdayDailyTraffic } from "./helpers";

const _dataset = process.env.NODE_ENV === 'test' ? testDataset : dataset;

type ProcessedArticle = Partial<Article> & {
  timeRange?: string;
  data?: number[];
  labels?: string[];
}

class Database {
  private trafficData: Article[] = _dataset.traffic_data;

  findOneByTimeRange(id: number, timeRange: string): ProcessedArticle | null {
    const article = this.trafficData[id];

    if (!article) return null;

    let data: number[] | undefined;
    let labels: string[] | undefined;

    if (timeRange === TimeRange.YESTERDAY) {
      const dayTraffic = getYesterdayDailyTraffic(article.daily_traffic);

      // data = dayTraffic?.hourly_traffic;
    } else if (timeRange === TimeRange.WEEK) {
      return article;
    } else if (timeRange === TimeRange.MONTH) {
      return article;
    } else {
      const dayTraffic: DayTraffic | undefined = getTodayDailyTraffic(article.daily_traffic);

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