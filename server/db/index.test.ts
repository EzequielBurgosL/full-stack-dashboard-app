import database from '.';
import { TimeRange } from '../types/timeRange';
import * as dateUtils from "../utils/dates";

describe('Database', () => {
  describe('findOneByTimeRange', () => {
    it('should return null if id is not a number - string', () => {
      const invalidId = 'invalid-id' as unknown as number
      const result = database.findOneByTimeRange(invalidId, TimeRange.TODAY);

      expect(result).toBeNull();
    });

    it('should return null if id is not a number - null', () => {
      const invalidId = null as unknown as number
      const result = database.findOneByTimeRange(invalidId, TimeRange.TODAY);

      expect(result).toBeNull();
    });

    it('should return null if id is negative', () => {
      const result = database.findOneByTimeRange(-1, TimeRange.TODAY);

      expect(result).toBeNull();
    });

    it('should return null if article does not exist', () => {
      const result = database.findOneByTimeRange(10000, TimeRange.TODAY);

      expect(result).toBeNull();
    });

    it('should return processed article for today time range', () => {
      jest.spyOn(dateUtils, 'getTodayDayNumber').mockImplementation(() => 1);
      const articleId = 1;
      const result = database.findOneByTimeRange(articleId, TimeRange.TODAY);

      expect(result).toEqual({
        id: 'f1cbfdfd-006f-4d77-9fbb-913758170a49',
        url: 'https://www.example.com/article1',
        author: 'John',
        image_url: 'https://picsum.photos/600/400?buster=0.19513832527942854',
        timeRange: TimeRange.TODAY,
        data: [ 10, 15 ],
        labels: [ '00', '01' ],
        totalTraffic: 25
      });
    });

    it('should return processed article for yesterday time range', () => {
      jest.spyOn(dateUtils, 'getYesterdayDayNumber').mockImplementation(() => 1);
      const articleId = 1;
      const result = database.findOneByTimeRange(articleId, TimeRange.YESTERDAY);

      expect(result).toEqual({
        id: 'f1cbfdfd-006f-4d77-9fbb-913758170a49',
        url: 'https://www.example.com/article1',
        author: 'John',
        image_url: 'https://picsum.photos/600/400?buster=0.19513832527942854',
        timeRange: TimeRange.YESTERDAY,
        data: [ 10, 15 ],
        labels: [ '00', '01' ],
        totalTraffic: 25
      });
    });

    it('should return processed article for month time range', () => {
      const articleId = 1;
      const result = database.findOneByTimeRange(articleId, TimeRange.MONTH);

      expect(result).toEqual({
        id: 'f1cbfdfd-006f-4d77-9fbb-913758170a49',
        url: 'https://www.example.com/article1',
        author: 'John',
        image_url: 'https://picsum.photos/600/400?buster=0.19513832527942854',
        timeRange: TimeRange.MONTH,
        data: [ 30, 40 ],
        labels: [ '00', '01' ],
        totalTraffic: 70
      });
    });
  });
});