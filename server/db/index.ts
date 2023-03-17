import devDataset from '../dataset.json';
import testDataset from '../fixtures/test-dataset';
import { Article } from '../types/article';
import { TimeRange } from '../types/timeRange';
import { totalArticlesTrafficPerHour } from './aggregation/articles';
import { getArticleTraffic, TotalTraffic } from './filter/article';
import { isValidId, isValidTimeRange } from '../utils/validation';

const localDataset = process.env.NODE_ENV === 'test' ? testDataset : devDataset;

type ProcessedArticle = Partial<Article> & {
  timeRange?: string;
  data?: number[];
  labels?: string[];
  totalTraffic?: number;
}

class Database {
  private articles: Article[] = localDataset.traffic_data;

  findByTimeRange(timeRange: TimeRange) {
    if (!isValidTimeRange(timeRange)) return null;

    const traffic = totalArticlesTrafficPerHour(this.articles, timeRange);

    return {
      data: this.getData(traffic),
      labels: this.getLabels(traffic),
      totalTraffic: this.getTotalTraffic(traffic)
    };
  }

  findOneByTimeRange(id: number, timeRange: TimeRange): ProcessedArticle | null {
    if (!isValidId(id) || !isValidTimeRange(timeRange)) return null;

    const article = this.articles[id - 1];

    if (!article) {
      console.log('article was not found');
      return null;
    }

    const traffic = getArticleTraffic[timeRange](article);

    return {
      id: article.id,
      url: article.url,
      author: article.author,
      image_url: article.image_url,
      timeRange,
      data: this.getData(traffic),
      labels: this.getLabels(traffic),
      totalTraffic: this.getTotalTraffic(traffic)
    };
  }

  private getLabels(traffic: TotalTraffic) {
    return traffic?.map(item => `${item.hour}`.padStart(2, '0'));
  }

  private getData(traffic: TotalTraffic) {
    return traffic?.map(item => item.traffic);
  }

  private getTotalTraffic(traffic: TotalTraffic){
    return traffic?.reduce((prev, curr) => prev += curr.traffic, 0);
  }
}

const database = new Database();

export default database;