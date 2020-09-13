import { IPersonWithSchedule } from '../models/person.model.interface';

export interface IScheduleService {
  getSchedule(peopleIds: string[], isoDateFrom: string, isoDateTo: string): Promise<IPersonWithSchedule[]>;
}