import { Moment, utc } from 'moment';

export const weekDayFilter = (d: Moment | null): boolean => {
  const day = (d || utc()).day();
  // Prevent Saturday and Sunday from being selected.
  return day !== 0 && day !== 6;
};
