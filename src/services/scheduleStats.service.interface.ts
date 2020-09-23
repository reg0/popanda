import { IActivityType } from '@/interfaces/enums/activityType.enum';
import { IPersonWithSchedule } from '@/interfaces/models/person.model.interface';

export interface IScheduleStatsService {
  getStats(schedule: IPersonWithSchedule[], activityTypes: IActivityType[]): Promise<{[activityTypeLabel: string]: {[isoDate: string]: number}}>;
}