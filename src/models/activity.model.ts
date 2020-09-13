import { ActivityType } from '@/interfaces/enums/activityType.enum';
import { IActivity } from '@/interfaces/models/actvity.model.interface';

export class Activity implements IActivity {
  constructor (
    private _id: string,
    private _isoDate: string,
    private _type: ActivityType,
    private _commentPublic: string,
    private _commentForSuperior: string,
  ) { }
  id(): string {
    return this._id;
  }
  isoDate(): string {
    return this._isoDate;
  }
  type(): ActivityType {
    return this._type;
  }
  commentPublic(): string {
    return this._commentPublic;
  }
  commentForSuperior(): string {
    return this._commentForSuperior;
  }
}