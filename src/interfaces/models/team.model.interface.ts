import { IPerson } from './person.model.interface';

export interface ITeam {
  id: string,
  name: string;
  peopleCount: number;
  orderNo: number;
}

export interface ITeamWithSchedule extends ITeam {

}
