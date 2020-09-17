import { IPerson } from '@/interfaces/models/person.model.interface';
import { ITeam } from '@/interfaces/models/team.model.interface';

export class Team implements ITeam {
  constructor (
    public readonly id: string,
    public readonly name: string,
    public readonly peopleCount: number,
    public readonly orderNo: number
  ) { }
}