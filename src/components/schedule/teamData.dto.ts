import { ActivityTypes } from '@/interfaces/enums/activityType.enum';
import { IActivity } from '@/interfaces/models/actvity.model.interface';
import { IPerson } from '@/interfaces/models/person.model.interface';

export interface TeamData {
  loading: boolean;
  loaded: boolean;
  activityTypesLoading: boolean;
  activityTypesLoaded: boolean;
  statsLoading: boolean;
  statsLoaded: boolean;
  people: IPerson[];
  activities: {[personId: string]: IActivity[]};
  activityTypes: ActivityTypes[];
  stats: {[activityTypeLabel: string]: {[isoDate: string]: number}};
}

export const TEAM_DATA_DEFAULT_VALUES = {
  loading: false,
  loaded: false,
  activityTypesLoading: false,
  activityTypesLoaded: false,
  statsLoading: false,
  statsLoaded: false,
  people: [] as IPerson[],
  activityTypes: [],
  activities: {},
  stats: {},
};
