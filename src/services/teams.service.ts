import { ITeamsService } from '@/interfaces/api/teams.service.interface';
import { ITeam } from '@/interfaces/models/team.model.interface';

export class TeamsService implements ITeamsService {
  getTeams(): Promise<ITeam[]> {
    return fetch('/api/teams').then((res) => res.json());
  }
}

export default new TeamsService();
