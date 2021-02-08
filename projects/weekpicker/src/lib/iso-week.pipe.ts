import { Pipe, PipeTransform } from '@angular/core';
import { Moment } from 'moment';
import { toISOWeek } from './to-iso-week';

@Pipe({
  name: 'isoWeek',
})
export class IsoWeekPipe implements PipeTransform {
  transform(value: Moment | null): string {
    return toISOWeek(value);
  }
}
