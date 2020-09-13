import { IPerson } from "../models/person.model.interface";

export interface IPeopleService {
  getTeammates(): Promise<IPerson[]>;
}