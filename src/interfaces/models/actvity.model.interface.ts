import { IActivityType } from '../enums/activityType.enum';

export interface IActivity {
  id: string;
  isoDate: string;
  type: IActivityType;
  commentPublic: string;
  commentForSuperior: string;
}