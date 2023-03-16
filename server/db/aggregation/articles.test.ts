import testDataset from "../../fixtures/test-dataset";
import { totalArticlesTrafficPerHour } from "./articles";
import * as dateUtils from '../../utils/dates';
import { TimeRange } from "../../types/timeRange";

describe("totalArticlesTrafficPerHour", () => {
  describe('given an empty array', () => {
    it("should return an empty array", () => {
      expect(totalArticlesTrafficPerHour([], TimeRange.MONTH)).toEqual([]);
    });
  });

  describe('given an array of articles', () => {
    describe('when the TimeRange is TODAY', () => {
      it('should return the aggregated traffic per hour of that day', () => {
        jest.spyOn(dateUtils, 'getTodayDayNumber').mockImplementation(() => 1);

        const result = totalArticlesTrafficPerHour(
          testDataset.traffic_data,
          TimeRange.TODAY
        );

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
        
        const result = totalArticlesTrafficPerHour(
          testDataset.traffic_data,
          TimeRange.YESTERDAY
        );
        
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
        
        const result = totalArticlesTrafficPerHour(
          testDataset.traffic_data,
          TimeRange.WEEK
        );
        
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
        const result = totalArticlesTrafficPerHour(
          testDataset.traffic_data,
          TimeRange.MONTH
        );

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
  })
});
