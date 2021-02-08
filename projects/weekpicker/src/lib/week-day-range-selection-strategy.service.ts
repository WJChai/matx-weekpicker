import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  DateRange,
  MatDateRangeSelectionStrategy,
} from '@angular/material/datepicker';
import { Moment } from 'moment';
import { Subject } from 'rxjs';

@Injectable()
export class WeekDayRangeSelectionStrategy
  implements MatDateRangeSelectionStrategy<Moment> {
  constructor(private _dateAdapter: DateAdapter<Moment>) {}

  private _selected$ = new Subject<Moment | null>();
  selected$ = this._selected$.asObservable();
  selectionFinished(date: Moment | null): DateRange<Moment> {
    this._selected$.next(date);
    return this._createWeekDayRange(date);
  }

  private _activeDate$ = new Subject<Moment | null>();
  activeDate$ = this._activeDate$.asObservable();
  createPreview(activeDate: Moment | null): DateRange<Moment> {
    this._activeDate$.next(activeDate);
    return this._createWeekDayRange(activeDate);
  }

  private _createWeekDayRange(date: Moment | null): DateRange<Moment> {
    if (date) {
      const day = this._dateAdapter.getDayOfWeek(date);
      if (day !== 0 && day !== 6) {
        const start = this._dateAdapter.addCalendarDays(date, -(day - 1));
        const end = this._dateAdapter.addCalendarDays(date, 5 - day);
        return new DateRange<Moment>(start, end);
      }
    }

    return new DateRange<Moment>(null, null);
  }
}
