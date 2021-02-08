import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  DateRange,
  MatDateRangePicker,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import {
  MatDatepickerControl,
  MatDatepickerPanel,
} from '@angular/material/datepicker/datepicker-base';
import { Moment } from 'moment';
import { animationFrameScheduler, EMPTY, Observable } from 'rxjs';
import { map, observeOn } from 'rxjs/operators';
import { WeekDayRangeSelectionStrategy } from '../week-day-range-selection-strategy.service';

/**
 * A wrapper component of mat-date-range-picker, this add a date range selection strategy
 * that select the 5 weekday and display the iso weeknumber at mat-date-range-picker-actions
 */
@Component({
  selector: 'matx-weekpicker',
  templateUrl: './weekpicker.component.html',
  styleUrls: ['./weekpicker.component.scss'],
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
})
export class WeekpickerComponent implements OnInit {
  previewDate: Moment | null = null;

  constructor(
    @Inject(MAT_DATE_RANGE_SELECTION_STRATEGY)
    public strategy: WeekDayRangeSelectionStrategy
  ) {}

  selected$: Observable<boolean> = EMPTY;
  ngOnInit() {
    this.strategy.activeDate$
      .pipe(observeOn(animationFrameScheduler))
      .subscribe((d) => (this.previewDate = d));
    this.selected$ = this.strategy.selected$.pipe(map((d) => d != null));
  }

  @ViewChild('picker', { static: true }) picker!: MatDateRangePicker<Moment>;
}
