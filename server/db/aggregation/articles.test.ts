import testDataset from '../../fixtures/test-dataset';
import {
  getArticlesTraffic,
  totalArticleTodayTraffic,
  totalArticleMonthTraffic
} from './articles';
import * as dateUtils from '../../utils/dates';
import { TimeRange } from '../../types/timeRange';

const articles = testDataset.traffic_data;
const firstArticle = articles[0];

describe('getArticlesTraffic', () => {
  describe('given an empty array', () => {
    it('should return an empty array', () => {
      expect(getArticlesTraffic([], TimeRange.TODAY)).toEqual([]);
    });
  });

  describe('given an array of articles', () => {
    describe('when the TimeRange is TODAY', () => {
      it('should return the aggregated traffic per hour of that day', () => {
        jest.spyOn(dateUtils, 'getTodayDayNumber').mockImplementation(() => 1);

        const result = getArticlesTraffic(articles, TimeRange.TODAY);

        expect(result).toEqual([
          {
            hour: 0,
            traffic: 40
          },
          {
            hour: 1,
            traffic: 50
          }
        ])
      })
    });

    describe('when the TimeRange is YESTERDAY', () => {
      it('should return the aggregated traffic per hour of that day', () => {
        jest.spyOn(dateUtils, 'getYesterdayDayNumber').mockImplementation(() => 1);
        
        const result = getArticlesTraffic(articles, TimeRange.YESTERDAY);
        
        expect(result).toEqual([
          {
            hour: 0,
            traffic: 40
          },
          {
            hour: 1,
            traffic: 50
          }
        ])
      })
    });

    describe('when the TimeRange is WEEK', () => {
      it('should return the aggregated traffic per day of that week', () => {
        jest.spyOn(dateUtils, 'getTodayDayNumber').mockImplementation(() => 2);
        
        const result = getArticlesTraffic(articles, TimeRange.WEEK);
        
        expect(result).toEqual([
          {
            day: 1,
            traffic: 90
          },
          {
            day: 2,
            traffic: 130
          }
        ])
      })
    });

    describe('when the TimeRange is MONTH', () => {
      it('should return the aggregated traffic per day of that month', () => {
        const result = getArticlesTraffic(articles, TimeRange.MONTH);

        expect(result).toEqual([
          {
            day: 1,
            traffic: 90
          },
          {
            day: 2,
            traffic: 130
          }
        ])
      })
    })
  });
});

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
