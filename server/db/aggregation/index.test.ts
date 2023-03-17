import testDataset from '../../fixtures/test-dataset';
import {
  totalArticleTodayTraffic,
  totalArticleMonthTraffic
} from '.';
import * as dateUtils from '../../utils/dates';

const articles = testDataset.traffic_data;
const firstArticle = articles[0];

describe('totalArticleTodayTraffic', () => {
  it('should return an aggregated number', () => {
    jest.spyOn(dateUtils, 'getTodayDayNumber').mockImplementation(() => 1);
    const result = totalArticleTodayTraffic(firstArticle);

    expect(result).toEqual(10 + 15);
  });
});

describe('totalArticleMonthTraffic', () => {
  it('should return an aggregated number', () => {
    const result = totalArticleMonthTraffic(firstArticle);

    expect(result).toEqual(10 + 15 + 20 + 25);
  });
});
