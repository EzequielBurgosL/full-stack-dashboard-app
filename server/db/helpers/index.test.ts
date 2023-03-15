import { getTodayTrafficPerHour, getYesterdayTrafficPerHour } from ".";
import testDataset from "../../fixtures/test-dataset";
import * as dateUtils from "../../utils/dates";

describe('db helpers', () => {
  const monthTraffic = testDataset.traffic_data[0].daily_traffic;

  describe('getTodayTrafficPerHour', () => {
    it('should return an array of objects containing hours and its traffic', () => {
      jest.spyOn(dateUtils, 'getTodayDayNumber').mockImplementation(() => 2);

      expect(getTodayTrafficPerHour(monthTraffic)).toEqual([
        {
          hour: 0,
          traffic: 20
        },
        {
          hour: 1,
          traffic: 25
        }
      ])
    });
  });

  describe('getYesterdayTrafficPerHour', () => {
    it('should return an array of objects containing hours and its traffic', () => {
      jest.spyOn(dateUtils, 'getYesterdayDayNumber').mockImplementation(() => 1);

      expect(getYesterdayTrafficPerHour(monthTraffic)).toEqual([
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
})