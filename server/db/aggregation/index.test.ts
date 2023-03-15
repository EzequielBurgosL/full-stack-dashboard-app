import testDataset from '../../fixtures/test-dataset';
import { totalArticlesMonthTrafficPerHour, getArticleMonthTrafficPerHour } from '.';

describe("getArticleMonthTrafficPerHour", () => {
  describe('given an empty array', () => {
    it("should return an empty array", () => {
      expect(getArticleMonthTrafficPerHour([])).toEqual([]);
    });
  });

  describe('given an array of ONE DAY with MULTIPLE HOURS of traffic', () => {
    it("should return an array with one aggregated object", () => {
      const firstArticleMonthTraffic = testDataset.traffic_data[0].daily_traffic;

      expect(getArticleMonthTrafficPerHour(firstArticleMonthTraffic)).toEqual([
        {
          hour: 0,
          traffic: 30
        },
        {
          hour: 1,
          traffic: 40
        }
      ]);
    });
  });
});

describe("totalArticlesMonthTrafficPerHour", () => {
  describe('given an empty array', () => {
    it("should return an empty array", () => {
      expect(totalArticlesMonthTrafficPerHour([])).toEqual([]);
    });
  });

  describe('given an array of ARTICLES with MULTIPLE DAYS and MULTIPLE HOURS of traffic', () => {
    it('should return an array with one aggregated object', () => {  
      expect(totalArticlesMonthTrafficPerHour(testDataset.traffic_data)).toEqual([
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
