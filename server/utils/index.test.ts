import mockData from '../fixtures/db-sample';
import { totalMonthTrafficPerHour, monthTrafficPerHour } from '.';

describe("monthTrafficPerHour", () => {
  describe('GIVEN an empty array', () => {
    it("SHOULD return an empty array", () => {
      expect(monthTrafficPerHour([])).toEqual([]);
    });
  });

  describe('GIVEN an array of ONE DAY with MULTIPLE HOURS of traffic', () => {
    it("SHOULD return an array with one aggregated object", () => {
      const firstArticleMonthTraffic = mockData.traffic_data[0].daily_traffic;

      expect(monthTrafficPerHour(firstArticleMonthTraffic)).toEqual([
        {
          hour: 0,
          totalTraffic: 30
        },
        {
          hour: 1,
          totalTraffic: 40
        }
      ]);
    });
  });
});

describe("totalMonthTrafficPerHour", () => {
  describe('GIVEN an empty array', () => {
    it("SHOULD return an empty array", () => {
      expect(monthTrafficPerHour([])).toEqual([]);
    });
  });

  describe('GIVEN an array of ARTICLES with MULTIPLE DAYS and MULTIPLE HOURS of traffic', () => {
    it('SHOULD return an array with one aggregated object', () => {  
      expect(totalMonthTrafficPerHour(mockData.traffic_data)).toEqual([
        {
          hour: 0,
          totalTraffic: 100
        },
        {
          hour: 1,
          totalTraffic: 120
        }
      ])
    })
  })
});
