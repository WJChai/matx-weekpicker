import { NgModule } from '@angular/core';
import { WeekpickerComponent } from './weekpicker/weekpicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { IsoWeekPipe } from './iso-week.pipe';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WeekpickerComponent, IsoWeekPipe],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatButtonModule,
    MatMomentDateModule,
  ],
  exports: [WeekpickerComponent, IsoWeekPipe, MatMomentDateModule],
})
export class MatxWeekpickerModule {}
