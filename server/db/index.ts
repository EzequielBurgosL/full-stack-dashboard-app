import dataset from "../dataset.json";
import testDataset from "../fixtures/test-dataset";
import { Article } from "../types/article";
import { TimeRange } from "../types/timeRange";
import { getTodayDayNumber, getYesterdayDayNumber } from "../utils/dates";

const _dataset = process.env.NODE_ENV === 'test' ? testDataset : dataset;

type ProcessedArticle = Partial<Article> & {
  data?: any;
  timeFrame?: string; 
}

class Database {
  private trafficData: Article[] = _dataset.traffic_data;

  findOneByTimeRange(id: number, timeRange: string): ProcessedArticle | null {
    const article = this.trafficData[id];

    if (!article) return null;

    if (timeRange === TimeRange.TODAY) {
      // @ts-ignore
      return Database.getTodayDailyTraffic(article);
    } else if (timeRange === TimeRange.YESTERDAY) {
      // @ts-ignore
      return Database.getYesterdayDailyTraffic(article);
    } else if (timeRange === TimeRange.WEEK) {
      return article;
    } else if (timeRange === TimeRange.MONTH) {
      return article;
    }

    return article;
  }

  static getTodayDailyTraffic(article: Article) {
    const currentDayNumber = getTodayDayNumber();
    const hourTraffic = article.daily_traffic.find((dayTraffic) => {
      return dayTraffic.day === currentDayNumber;
    });

    return hourTraffic;
  }

  static getYesterdayDailyTraffic(article: Article) {
    const currentDayNumber = getYesterdayDayNumber();
    const hourTraffic = article.daily_traffic.find((dayTraffic) => {
      return dayTraffic.day === currentDayNumber;
    });

    return hourTraffic;
  }
}

const database = new Database();

export default database;