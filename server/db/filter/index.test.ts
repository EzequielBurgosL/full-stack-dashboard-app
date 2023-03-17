import testDataset from '../../fixtures/test-dataset';
import { Article } from '../../types/article';
import {
  getArticleMonthTrafficPerDay,
  getArticlesTraffic,
  getArticleTodayTrafficPerHour,
  getArticleYesterdayTrafficPerHour
} from '.';
import * as dateUtils from '../../utils/dates';
import { TimeRange } from '../../types/timeRange';

const articles = testDataset.traffic_data;
const firstArticle = articles[0];

describe('getArticleTodayTrafficPerHour', () => {
  it('should return an empty array on wrong input', () => {
    const wrongInput = null as unknown as Article;
    const result = getArticleTodayTrafficPerHour(wrongInput);

    expect(result).toEqual([]);
  });

  it('should return an array of hourly traffic data', () => {
    jest.spyOn(dateUtils, 'getTodayDayNumber').mockImplementation(() => 1);
    const result = getArticleTodayTrafficPerHour(firstArticle);

    expect(result).toEqual([
      {
        hour: 0,
        traffic: 10
      },
      {
        hour: 1,
        traffic: 15
      }
    ]);
  });
});

describe('getArticleYesterdayTrafficPerHour', () => {
  it('should return an empty array on wrong input', () => {
    const wrongInput = null as unknown as Article;
    const result = getArticleYesterdayTrafficPerHour(wrongInput);

    expect(result).toEqual([]);
  });

  it('should return an array of hourly traffic data', () => {
    jest.spyOn(dateUtils, 'getYesterdayDayNumber').mockImplementation(() => 1);
    const result = getArticleYesterdayTrafficPerHour(firstArticle);

    expect(result).toEqual([
      {
        hour: 0,
        traffic: 10
      },
      {
        hour: 1,
        traffic: 15
      }
    ]);
  });
});

describe("getArticleMonthTrafficPerDay", () => {
  describe('given an empty array', () => {
    it("should return an empty array given an empty array", () => {
      const wrongInput = null as unknown as Article;
      expect(getArticleMonthTrafficPerDay(wrongInput)).toEqual([]);
    });
  });

  describe('given an array of daily traffic', () => {
    it("should return an array with one aggregated object", () => {
      expect(getArticleMonthTrafficPerDay(firstArticle)).toEqual([
        {
          day: 1,
          traffic: 25
        },
        {
          day: 2,
          traffic: 45
        }
      ]);
    });
  });
});

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