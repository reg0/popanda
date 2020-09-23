import { IActivityTypesService } from '@/interfaces/api/activityTypes.service.interface';
import { ActivityType, IActivityType } from '@/interfaces/enums/activityType.enum';

export class ActivityTypesStubService implements IActivityTypesService {
  getActivityTypes(teamId: string): Promise<IActivityType[]> {
    return Promise.resolve([ActivityType.HOME_OFFICE, ActivityType.OFFICE, ActivityType.VACATION, ActivityType.UNDEFINED]);
  }
}

export default new ActivityTypesStubService();
