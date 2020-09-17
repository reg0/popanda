import { Person } from '@/models/person.model';
import { IPerson } from '@/interfaces/models/person.model.interface';
import { IPeopleService } from '@/interfaces/api/people.service.interface';

export class PeopleService implements IPeopleService {
  async getTeammates(teamId: string): Promise<IPerson[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(teamId === 't001' ? [
          new Person('p0000', 'Kamil', 'Mikula'),
          new Person('p0001', 'Piotr', 'Flisak'),
          new Person('p0002', 'Krystian', 'Przerwa-Tetmajer'),
          new Person('p0003', 'Pawel', 'Smyczewski'),
          new Person('p0004', 'Lukasz', 'Bocian'),
        ] : [
          new Person('p0000', 'Kamil', 'Mikula'),
          new Person('p0006', 'Stanislav', 'Tachman'),
          new Person('p0007', 'Benjamin', 'Tostojad'),
        ]);
      }, 300);
    });
  }
}

export default new PeopleService();
