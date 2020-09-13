import { Person } from "@/models/person.model";
import { IPerson } from '@/interfaces/models/person.model.interface';
import { IPeopleService } from '@/interfaces/api/people.service.interface';

export class PeopleService implements IPeopleService {
  async getTeammates(): Promise<IPerson[]> {
    return [
      new Person('p0001', 'Piotr', 'Flis'),
      new Person('p0002', 'Stanislav', 'Mantach'),
      new Person('p0003', 'Krystian', 'Przybyła-Warmuziński'),
      new Person('p0004', 'Paweł', 'Smorczewski'),
      new Person('p0005', 'Łukasz', 'Storka'),
    ];
  }
}

export default new PeopleService();
