import { IScheduleService } from '@/interfaces/api/schedule.service.interface';
import { Person, PersonWithSchedule } from '@/models/person.model';
import { asyncForEachDate } from '@/utils/date.utils';
import { IActivity } from '@/interfaces/models/actvity.model.interface';
import { Activity } from '@/models/activity.model';
import { ActivityType } from '@/interfaces/enums/activityType.enum';
import { IPersonWithSchedule } from '@/interfaces/models/person.model.interface';

const ALL = [
  new Person('p0001', 'Piotr', 'Flis'),
  new Person('p0002', 'Stanislav', 'Mantach'),
  new Person('p0003', 'Krystian', 'Przybyła-Warmuziński'),
  new Person('p0004', 'Paweł', 'Smorczewski'),
  new Person('p0005', 'Łukasz', 'Storka'),
];


export class ScheduleService implements IScheduleService {
  async getSchedule(peopleIds: string[], isoDateFrom: string, isoDateTo: string): Promise<IPersonWithSchedule[]> {
    const result = [];
    for (let id in peopleIds) {
      const person = ALL.find(person => person.id() === id);
      if (!person) {
        continue;
      }

      const activities: IActivity[] = [];
      await asyncForEachDate(isoDateFrom, isoDateTo, async (isoDate: string) => {
        activities.push(
          new Activity(
            `a${id}_${isoDate}`, 
            isoDate, 
            Math.random() > 0.8 ? ActivityType.OFFICE : ActivityType.HOME_OFFICE,
            '',
            ''
          )
        );
      });

      result.push(new PersonWithSchedule(person.id(), person.firstName(), person.lastName(), activities));
    }
    return result;
  }
}

export default new ScheduleService();