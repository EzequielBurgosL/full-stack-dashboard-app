import { getTodayDailyTraffic, getYesterdayDailyTraffic } from ".";
import testDataset from "../../fixtures/test-dataset";
import * as dateUtils from "../../utils/dates";

describe('db helpers', () => {
  const monthTraffic = testDataset.traffic_data[0].daily_traffic;

  describe('getTodayDailyTraffic', () => {
    it('should return an array of objects containing hours and its traffic', () => {
      jest.spyOn(dateUtils, 'getTodayDayNumber').mockImplementation(() => 2);

      expect(getTodayDailyTraffic(monthTraffic)).toEqual({
        day: 2,
        hourly_traffic: [
          {
            hour: 0,
            traffic: 20
          },
          {
            hour: 1,
            traffic: 25
          }
        ]
      })
    });
  });

  describe('getYesterdayDailyTraffic', () => {
    it('should return an array of objects containing hours and its traffic', () => {
      jest.spyOn(dateUtils, 'getYesterdayDayNumber').mockImplementation(() => 1);

      expect(getYesterdayDailyTraffic(monthTraffic)).toEqual({
        day: 1,
        hourly_traffic: [
          {
            hour: 0,
            traffic: 10
          },
          {
            hour: 1,
            traffic: 15
          }
        ]
      })
    });
  });
})