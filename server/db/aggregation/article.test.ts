import testDataset from '../../fixtures/test-dataset';
import { Article } from '../../types/article';
import {
  getArticleMonthTrafficPerHour,
  getArticleTodayTrafficPerHour,
  getArticleYesterdayTrafficPerHour
} from './article';
import * as dateUtils from '../../utils/dates';

describe("db aggregation - article", () => {
  const firstArticle = testDataset.traffic_data[0];

  describe("getArticleMonthTrafficPerHour", () => {
    describe('given an empty array', () => {
      it("should return an empty array given an empty array", () => {
        const wrongInput = null as unknown as Article;
        expect(getArticleMonthTrafficPerHour(wrongInput)).toEqual([]);
      });
    });
  
    describe('given an array of ONE DAY with MULTIPLE HOURS of traffic', () => {
      it("should return an array with one aggregated object", () => {  
        expect(getArticleMonthTrafficPerHour(firstArticle)).toEqual([
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
});
