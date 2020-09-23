export interface IActivityType {
  label: string;
  color: string;
}

export class ActivityType {
  static VACATION = { label: 'VACATION', color: '#ff0000' } as IActivityType;
  static SICK = { label: 'SICK', color: '#cccc00' } as IActivityType;
  static LONG_TERM_LEAVE = { label: 'LONG_TERM_LEAVE', color: '#cc00cc' } as IActivityType;
  static OFFICE = { label: 'OFFICE', color: '#0000dd' } as IActivityType;
  static HOME_OFFICE = { label: 'HOME_OFFICE', color: '#00dddd' } as IActivityType;
  static UNDEFINED = { label: 'UNDEFINED', color: '#dddddd' } as IActivityType;
}
