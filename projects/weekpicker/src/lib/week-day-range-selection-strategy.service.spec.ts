import { TestBed } from '@angular/core/testing';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { sameMoment } from './testing';
import { WeekDayRangeSelectionStrategy } from './week-day-range-selection-strategy.service';

describe('WeekDayRangeSelectionStrategy', () => {
  let strategy: WeekDayRangeSelectionStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DateAdapter,
          useClass: MomentDateAdapter,
          deps: [MAT_DATE_LOCALE],
        },
        {
          provide: WeekDayRangeSelectionStrategy,
          useClass: WeekDayRangeSelectionStrategy,
        },
      ],
    });
    strategy = TestBed.inject(WeekDayRangeSelectionStrategy);
  });

  it('should be created', () => {
    expect(strategy).toBeTruthy();
  });

  describe('selected$', () => {
    it('should emit when selectionFinished() is called', () => {
      const spy = jasmine.createSpy();
      strategy.selected$.subscribe(spy);
      strategy.selectionFinished(null);
      expect(spy).toHaveBeenCalledOnceWith(null);
    });

    it('should emit selected date when selectionFinished() is called', () => {
      const spy = jasmine.createSpy();
      strategy.selected$.subscribe(spy);
      const m = moment();
      strategy.selectionFinished(m);
      expect(spy).toHaveBeenCalledOnceWith(m);
    });
  });

  describe('selectionFinished()', () => {
    it('should return {start: Monday, end: Friday} when called with weekday', () => {
      const monday = moment([2021, 1, 1]); // 1 Feb, 2021 (Monday)
      const friday = moment([2021, 1, 5]); // 5 Feb, 2021 (Friday)
      for (let i = 1; i <= 5; i++) {
        const range = strategy.selectionFinished(moment([2021, 1, i]));
        expect(range.start).toEqual(sameMoment(monday));
        expect(range.end).toEqual(sameMoment(friday));
      }
    });

    it('should return {start: null, end: null} when called with Saturday', () => {
      const saturday = moment([2021, 1, 6]); // 6 Feb, 2021 (Saturday)
      const range = strategy.selectionFinished(saturday);
      expect(range.start).toBeNull();
      expect(range.end).toBeNull();
    });

    it('should return {start: null, end: null} when called with Sunday', () => {
      const saturday = moment([2021, 1, 7]); // 7 Feb, 2021 (Sunday)
      const range = strategy.selectionFinished(saturday);
      expect(range.start).toBeNull();
      expect(range.end).toBeNull();
    });
  });

  describe('activeDate$', () => {
    it('should emit when createPreview() is called', () => {
      const spy = jasmine.createSpy();
      strategy.activeDate$.subscribe(spy);
      strategy.createPreview(null);
      expect(spy).toHaveBeenCalledOnceWith(null);
    });

    it('should emit activeDate date when createPreview() is called', () => {
      const spy = jasmine.createSpy();
      strategy.activeDate$.subscribe(spy);
      const m = moment();
      strategy.createPreview(m);
      expect(spy).toHaveBeenCalledOnceWith(m);
    });
  });

  describe('createPreview()', () => {
    it('should return {start: Monday, end: Friday} when called with weekday', () => {
      const monday = moment([2021, 1, 1]); // 1 Feb, 2021 (Monday)
      const friday = moment([2021, 1, 5]); // 5 Feb, 2021 (Friday)
      for (let i = 1; i <= 5; i++) {
        const range = strategy.createPreview(moment([2021, 1, i]));
        expect(range.start).toEqual(sameMoment(monday));
        expect(range.end).toEqual(sameMoment(friday));
      }
    });

    it('should return {start: null, end: null} when called with Saturday', () => {
      const saturday = moment([2021, 1, 6]); // 6 Feb, 2021 (Saturday)
      const range = strategy.createPreview(saturday);
      expect(range.start).toBeNull();
      expect(range.end).toBeNull();
    });

    it('should return {start: null, end: null} when called with Sunday', () => {
      const saturday = moment([2021, 1, 7]); // 7 Feb, 2021 (Sunday)
      const range = strategy.createPreview(saturday);
      expect(range.start).toBeNull();
      expect(range.end).toBeNull();
    });
  });
});
