import * as moment from 'moment';
import { toISOWeek } from './to-iso-week';

describe('toISOWeek()', () => {
  it('return string when date is valid moment', () => {
    const d = moment([2010, 6, 10]);
    expect(toISOWeek(d)).toEqual('Week 27, 2010');
  });
});
