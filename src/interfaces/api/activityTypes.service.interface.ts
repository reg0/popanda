import { IActivityType } from '../enums/activityType.enum';

export interface IActivityTypesService {
  getActivityTypes(teamId: string): Promise<IActivityType[]>;
}