/* eslint-disable no-await-in-loop, no-constant-condition */

import * as moment from 'moment';

export class MyDate {
  day: number;
  month: number;
  year: number;
  week: number;
  dayOfWeek: number;
  constructor(public readonly isoDate: string) {
    const m = moment.utc(isoDate);
    this.day = m.date();
    this.month = m.month();
    this.year = m.year();
    this.week = m.isoWeek();
    this.dayOfWeek = m.isoWeekday();
  }
}

export async function asyncForEachDate(isoDateFrom: string, isoDateTo: string, doStuff: Function): Promise<void> {
  let i = moment.utc(isoDateFrom);

  while (true) {
    const iIso = i.format('YYYY-MM-DD');
    await doStuff(iIso);
    if (iIso === isoDateTo) {
      break;
    }
    i = i.add(1, 'day');
  }
}

export function getArrayOfDates(isoDateFrom: string, isoDateTo: string): MyDate[] {
  const result = [];
  let i = moment.utc(isoDateFrom);

  while (true) {
    const iIso = i.format('YYYY-MM-DD');
    result.push(new MyDate(iIso));
    if (iIso === isoDateTo) {
      break;
    }
    i = i.add(1, 'day');
  }

  return result;
}

/* eslint-enable no-await-in-loop, no-constant-condition */
