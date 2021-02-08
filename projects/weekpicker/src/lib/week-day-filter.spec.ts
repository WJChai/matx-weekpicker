import * as moment from 'moment';
import { weekDayFilter } from './week-day-filter';

describe('weekDayFilter', () => {
  it('should return true if call with weekday', () => {
    for (let i = 1; i <= 5; i++) {
      // 1-5 Feb, 2021 (Monday - Friday)
      expect(weekDayFilter(moment([2021, 1, i]))).toBeTrue();
    }
  });

  it('should return false if call with Saturday', () => {
    // 6 Feb, 2021 (Saturday)
    expect(weekDayFilter(moment([2021, 1, 6]))).toBeFalse();
  });

  it('should return false if call with Sunday', () => {
    // 7 Feb, 2021 (Sunday)
    expect(weekDayFilter(moment([2021, 1, 7]))).toBeFalse();
  });
});
