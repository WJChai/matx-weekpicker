import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import * as moment from 'moment';
import { IsoWeekPipe } from '../iso-week.pipe';
import { WeekDayRangeSelectionStrategy } from '../week-day-range-selection-strategy.service';

import { WeekpickerComponent } from './weekpicker.component';

describe('WeekpickerComponent', () => {
  let component: WeekpickerComponent;
  let fixture: ComponentFixture<WeekpickerComponent>;
  let strategy: WeekDayRangeSelectionStrategy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DateAdapter,
          useClass: MomentDateAdapter,
          deps: [MAT_DATE_LOCALE],
        },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        {
          provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
          useClass: WeekDayRangeSelectionStrategy,
        },
      ],
      declarations: [WeekpickerComponent, IsoWeekPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    strategy = fixture.componentRef.injector.get<WeekDayRangeSelectionStrategy>(
      MAT_DATE_RANGE_SELECTION_STRATEGY
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(strategy).toEqual(component.strategy);
  });

  describe('previewDate', () => {
    it('should be updated when activeDate$ emit', fakeAsync(() => {
      const m = moment();
      strategy.createPreview(m);
      tick(999);
      expect(component.previewDate).toEqual(m);
    }));
  });

  describe('selected$', () => {
    it('should emit true when non null date is selected', () => {
      const spy = jasmine.createSpy();
      component.selected$.subscribe(spy);
      strategy.selectionFinished(moment());
      expect(spy).toHaveBeenCalledOnceWith(true);
    });

    it('should emit false when null is selected', () => {
      const spy = jasmine.createSpy();
      component.selected$.subscribe(spy);
      strategy.selectionFinished(null);
      expect(spy).toHaveBeenCalledOnceWith(false);
    });
  });
});
