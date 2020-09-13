import * as moment from 'moment';

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