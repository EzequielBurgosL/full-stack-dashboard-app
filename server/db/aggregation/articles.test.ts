import testDataset from '../../fixtures/test-dataset';
import {
  totalArticlesTrafficPerHour,
  totalArticleTodayTraffic,
  totalArticleMonthTraffic
} from './articles';
import * as dateUtils from '../../utils/dates';
import { TimeRange } from '../../types/timeRange';

const articles = testDataset.traffic_data;
const firstArticle = articles[0];

describe('totalArticlesTrafficPerHour', () => {
  describe('given an empty array', () => {
    it('should return an empty array', () => {
      expect(totalArticlesTrafficPerHour([], TimeRange.TODAY)).toEqual([]);
    });
  });

  describe('given an array of articles', () => {
    describe('when the TimeRange is TODAY', () => {
      it('should return the aggregated traffic per hour of that day', () => {
        jest.spyOn(dateUtils, 'getTodayDayNumber').mockImplementation(() => 1);

        const result = totalArticlesTrafficPerHour(articles, TimeRange.TODAY);

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
        
        const result = totalArticlesTrafficPerHour(articles, TimeRange.YESTERDAY);
        
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
      it('should return the aggregated traffic per hour of that week', () => {
        jest.spyOn(dateUtils, 'getTodayDayNumber').mockImplementation(() => 2);
        
        const result = totalArticlesTrafficPerHour(articles, TimeRange.WEEK);
        
        expect(result).toEqual([
          {
            hour: 0,
            traffic: 100
          },
          {
            hour: 1,
            traffic: 120
          }
        ])
      })
    });

    describe('when the TimeRange is MONTH', () => {
      it('should return the aggregated traffic per hour of that month', () => {
        const result = totalArticlesTrafficPerHour(articles, TimeRange.MONTH);

        expect(result).toEqual([
          {
            hour: 0,
            traffic: 100
          },
          {
            hour: 1,
            traffic: 120
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
