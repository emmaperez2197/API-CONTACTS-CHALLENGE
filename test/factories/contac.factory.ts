import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';

import { Contact } from 'src/modules/contact/models/contact.model';

export class ContactFactory {
  private model: Model<Contact>;
  constructor(model: Model<Contact>) {
    this.model = model;
  }

  async create(): Promise<Contact> {
    return await this.model.create(this.payloadToCreate());
  }

  payloadToCreate() {
    return {
      name: faker.person.fullName(),
      company: faker.company.name(),
      email: faker.internet.email(),
      birthDate: faker.date.birthdate().toISOString(),
      phoneNumbers: {
        personal: faker.phone.number(),
        work: faker.phone.number(),
      },
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
    };
  }
}
