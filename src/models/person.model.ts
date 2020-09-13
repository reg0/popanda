import { IPerson, IPersonWithSchedule } from '@/interfaces/models/person.model.interface';
import { IActivity } from '@/interfaces/models/actvity.model.interface';

export class Person implements IPerson {
  constructor(protected _id: string, protected _firstName: string, protected _lastName: string) { }

  id() {
    return this._id;
  }

  firstName() {
    return this._firstName;
  }

  lastName() {
    return this._lastName;
  }

  initials() {
    return `${ this._firstName.charAt(0) }${ this._lastName.replaceAll(/[\W]+/, ' ').split(' ').map(part => part.charAt(0)).join('').toLocaleUpperCase() }`;
  }
}

export class PersonWithSchedule extends Person implements IPersonWithSchedule {
  constructor(_id: string, _firstName: string, _lastName: string, protected _activities: IActivity[]) {
    super(_id, _firstName, _lastName);
  }

  activitiesPerDay(): IActivity[] {
    return this._activities;
  }
}