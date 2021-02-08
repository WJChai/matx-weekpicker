import { Moment } from 'moment';

/**
 * transform a moment date to iso week string
 * for example: 'Week 24, 2012'
 * @param value a valid Moment date
 */
export function toISOWeek(value: Moment | null): string {
  return value == null ? '' : value.format('[Week] WW, YYYY');
}
